import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import deepPopulate from "mongoose-deep-populate";
const Schema = mongoose.Schema;
// * Mongoose defult timestamps
const timestamps = {
  timestamps: true,
};

const orderSchema = new Schema({
  customerName:
  {
    type: String,
    required: true,
  },
  totalQuantity:
  {
    type: Number,
    required: true,
  },
  totalPrice:
  {
    // value: {
    //     type: Number,
    //     required: true
    // },
    // unit: {
    //     type: String,
    //     required: true,
    //     default: 'rs',
    //     enum: ['rs'],
    // }
    type: Number,
    required: true
  },
  orderDate:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, timestamps);

orderSchema.plugin(mongoosePaginate);
export const OrderSchema = orderSchema;

