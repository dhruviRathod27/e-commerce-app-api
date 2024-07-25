import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import deepPopulate from "mongoose-deep-populate";
const Schema = mongoose.Schema;
// * Mongoose defult timestamps
const timestamps = {
  timestamps: true,
};

const productSchema = new Schema({
  name:
  {
    type: String,
    required: true,
  },
  description:
  {
    type: String,
    required: true,
  },
  imageUrl:
  {
    type: String,
    required: true,
  },
  price:
  {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, timestamps);

productSchema.plugin(mongoosePaginate);
export const ProductSchema = productSchema;

