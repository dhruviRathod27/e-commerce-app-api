import { Request, Response } from 'express';
import _ from 'lodash'
import { ApiResponse } from '../../response';
import { ProductService } from './productService';

const productService: ProductService = new ProductService();
const response: ApiResponse = new ApiResponse();
export class ProductController {
    
    // * Add product
    public addProduct = async (req: Request, res: Response) => {
        try {
            console.log('# ProductController -> addProduct start');
            const productData = await productService.addProduct(req.body);
            console.log('productData===>', productData);
            if(_.isError(productData) || _.isEmpty(productData) ) {
                return response.error(req, res, productData, "PRODUCT_CREATE_ERROR");
            }
            console.log('# ProductController -> addProduct end');
            return response.send(req, res, productData, 'PRODUCT_CREATED');
            
        } catch (err) {
            console.log('# ProductController -> addProduct -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }

    // * Get Product By id
    public getProductById = async (req: Request, res: Response) => {
        try {
            console.log('# ProductController -> getProductById : start');
            const productDetails = await productService.getProductById({
                _id: req.params.productId,
                isDeleted: false
            });

            if(_.isEmpty(productDetails)){
                return response.error(req, res, productDetails, "PRODUCT_NOT_FOUND");
            }
            else if(_.isError(productDetails) ){
                return response.error(req, res, productDetails, "PRODUCT_FETCH_ERROR");
            }

            return response.send(req, res, productDetails, 'PRODUCT_FETCHED');

        } catch (error) {
            console.log('# ProductController -> getProductById -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Update Product
    public updateProduct = async (req: Request, res: Response) => {
        try {
            // req.body.updatedBy = req.userId;
            console.log('# ProductController -> updateProduct : start');
            const updatedData:any = await productService.updateProduct(
                {
                    _id: req.params.productId,
                    isDeleted:false
                },
                req.body
            )
            if(_.isError(updatedData) || _.isEmpty(updatedData)){
                return response.error(req, res, updatedData, "PRODUCT_UPDATE_ERROR");
            }
            else if (updatedData.modifiedCount <= 0){
                return response.error(
                    req, 
                    res, 
                    {productId: req.params.productId,"req.body":req.body}, 
                    "PRODUCT_NOT_UPDATED"
                );
            }

            return response.send(req, res, updatedData, "PRODUCT_UPDATED");
        } catch (error) {
            console.error('# ProductController -> updateProduct -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Delete Product
    public deleteProduct= async (req: Request, res: Response) => {
        try {
            console.log('# ProductController -> deleteProduct : start');
            const deletedData:any = await productService.deleteProduct(
                {
                    _id: req.params.productId,
                }
            )
            if(_.isError(deletedData) || _.isEmpty(deletedData)){
                return response.error(req, res, deletedData, "PRODUCT_DELETE_ERROR");
            }
            else if (deletedData.modifiedCount <= 0){
                return response.error(req, res, {productId: req.params.productId}, "PRODUCT_NOT_DELETED");
            }

            return response.send(req, res, deletedData, "PRODUCT_DELETED");
        } catch (error) {
            console.error('# ProductController -> deleteProduct -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Get Product Table
    public getProductTable = async (req: Request, res: Response) => {
        try {

            console.log('req.query===>', req.query);

            console.log('# ProductController -> getProductTable : start');

            const productTable = await productService.getProductTable(req);
            
            if(_.isError(productTable) || _.isEmpty(productTable)){
                return response.error(req, res, productTable, "PRODUCT_TABLE_ERROR");
            }
            console.log('# ProductController productTable===>', productTable);
            return response.send(req, res, productTable, "PRODUCT_TABLE_FETCHED");
        } catch (error) {
            console.error('# ProductController -> getProductTable -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }
}