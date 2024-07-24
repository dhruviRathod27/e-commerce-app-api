import { Query } from '../../utils/query';
import _ from 'lodash';
import mongoose from 'mongoose';
import { ProductSchema } from './productModule';

const productModel = mongoose.model('Product', ProductSchema);
const query: Query = new Query();

export class ProductService extends Query {

  // * Add Product
  public addProduct = async (reqData: any) => {
    try {
      console.log('# ProductService - > addProduct start');

      const productData = await query.save(productModel, reqData);
      console.log('# ProductService - > addProduct -> query.save result: ',productData);

      return productData;
    } catch (error) {
      console.log('# ProductService -> addProduct -> catch: ', error);
      return error;
    }
  };

  // * Get Product with id
  public getProductById = async (reqData: any) => {
    try {
      console.log('# ProductService - > getProductById : start');
      const ProductDetails = await query.find(productModel,reqData,'',{})
      console.log('# ProductService - > getProductById -> query.find result: ',ProductDetails);

      return ProductDetails;
      
    } catch (error) {
      console.log('# ProductService - > getProductById -> catch : ', error);
      return error;
    }
  }

  // * Update Product
  public updateProduct = async (reqData: any, updateData: any) => {
    try {
      console.log('# ProductService - > updateProduct : start');

      const updatedData = await query.updateOne(productModel, reqData, updateData);
      console.log('# ProductService - > updateProduct -> query.updateOne result: ',updatedData);

      return updatedData;
    } catch (error) {
      console.log('# ProductService - > updateProduct -> catch : ', error);
      return error;
    }
  }

  // * Delete Product
  public deleteProduct = async (reqData: any) => {
    try {
      console.log('# ProductService - > deleteProduct : start');

      const deletedData = await query.updateOne(productModel, reqData, {isDeleted: true});
      console.log('# ProductService - > deleteProduct -> query.updateOne result: ',deletedData);

      return deletedData;
    } catch (error) {
      console.log('# ProductService - > deleteProduct -> catch : ', error);
      return error;
    }
  }

  public getProductTable = async (reqData: any) => {
    try {
      console.log('# ProductService - > getProductTable : start');

    //   const limit = _.toNumber(reqData.query.perPage) || 10;
    //   const skip = _.toNumber(reqData.query.page) * _.toNumber(reqData.query.perPage)

      const filter = {
        isDeleted: false,
      }

    //   let options: any = {
    //     lean: true,
    //     limit: limit,
    //     skip: skip,
    //   }
      const totalCount = await query.count(productModel,filter);
      let productTable:any = await query.findWithPaginationAndPopulation(productModel,filter,'',{},{},'',{});

      let extraData = {
        perPage: _.toNumber(reqData.query.perPage),
        page: _.toNumber(reqData.query.page),
        total: totalCount
      }

      console.log('# ProductService - > getProductTable -> query.findWithPaginationAndPopulation result: ',{data:productTable,extraData});
      
      return {data:productTable,extraData};

    } catch (error) {
      console.log('# ProductService - > getProductTable -> catch : ', error);
    }
  }
}
