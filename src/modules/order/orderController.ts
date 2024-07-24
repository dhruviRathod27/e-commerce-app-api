import { Request, Response } from 'express';
import _ from 'lodash'
import { ApiResponse } from '../../response';
import { OrderService } from './orderService';

const orderService: OrderService = new OrderService();
const response: ApiResponse = new ApiResponse();
export class OrderController {
    
    // * Add Order
    public addOrder = async (req: Request, res: Response) => {
        try {
            console.log('# OrderController -> addOrder start');
            const orderData = await orderService.addOrder(req.body);
            console.log('orderData===>', orderData);
            if(_.isError(orderData) || _.isEmpty(orderData) ) {
                return response.error(req, res, orderData, "ORDER_CREATE_ERROR");
            }
            console.log('# OrderController -> addOrder end');
            return response.send(req, res, orderData, 'ORDER_CREATED');
            
        } catch (err) {
            console.log('# OrderController -> addOrder -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }

    // * Get Order By id
    public getOrderById = async (req: Request, res: Response) => {
        try {
            console.log('# OrderController -> getOrderById : start');
            const orderDetails = await orderService.getOrderById({
                _id: req.params.orderId,
                isDeleted: false
            });

            if(_.isEmpty(orderDetails)){
                return response.error(req, res, orderDetails, "ORDER_NOT_FOUND");
            }
            else if(_.isError(orderDetails) ){
                return response.error(req, res, orderDetails, "ORDER_FETCH_ERROR");
            }

            return response.send(req, res, orderDetails, 'ORDER_FETCHED');

        } catch (error) {
            console.log('# OrderController -> getOrderById -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Get Order Table
    public getOrderTable = async (req: Request, res: Response) => {
        try {

            console.log('req.query===>', req.query);

            console.log('# OrderController -> getOrderTable : start');

            const orderTable = await orderService.getOrderTable(req);
            
            if(_.isError(orderTable) || _.isEmpty(orderTable)){
                return response.error(req, res, orderTable, "ORDER_TABLE_ERROR");
            }
            console.log('# OrderController orderTable===>', orderTable);
            return response.send(req, res, orderTable, "ORDER_TABLE_FETCHED");
        } catch (error) {
            console.error('# OrderController -> getOrderTable -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }
}