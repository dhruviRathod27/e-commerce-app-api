import { Query } from '../../utils/query';
import _ from 'lodash';
import mongoose from 'mongoose';
import { OrderSchema } from './orderModule';

const orderModel = mongoose.model('Order', OrderSchema);
const query: Query = new Query();

export class OrderService extends Query {

  // * Add Order
  public addOrder = async (reqData: any) => {
    try {
      console.log('# OrderService - > addOrder start');

      const orderData = await query.save(orderModel, reqData);
      console.log('# OrderService - > addOrder -> query.save result: ',orderData);

      return orderData;
    } catch (error) {
      console.log('# OrderService -> addOrder -> catch: ', error);
      return error;
    }
  };

  // * Get Order with id
  public getOrderById = async (reqData: any) => {
    try {
      console.log('# OrderService - > getOrderById : start');
      const orderDetails = await query.find(orderModel,reqData,'',{})
      console.log('# OrderService - > getOrderById -> query.find result: ',orderDetails);

      return orderDetails;
      
    } catch (error) {
      console.log('# OrderService - > getOrderById -> catch : ', error);
      return error;
    }
  }


  public getOrderTable = async (reqData: any) => {
    try {
      console.log('# OrderService - > getOrderTable : start');

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
      const totalCount = await query.count(orderModel,filter);
      let orderTable:any = await query.findWithPaginationAndPopulation(orderModel,filter,'',{},{},'',{});

      let extraData = {
        perPage: _.toNumber(reqData.query.perPage),
        page: _.toNumber(reqData.query.page),
        total: totalCount
      }

      console.log('# OrderService - > getOrderTable -> query.findWithPaginationAndPopulation result: ',{data:orderTable,extraData});
      
      return {data:orderTable,extraData};

    } catch (error) {
      console.log('# OrderService - > getOrderTable -> catch : ', error);
    }
  }
}
