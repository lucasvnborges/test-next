import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "name is required."],
  },
  price: {
    type: Number,
    required: [true, "price is required."],
  },
  quantity: {
    type: Number,
    default: 1,
    required: [true, "quantity is required."],
  },
  purchased: {
    type: Boolean,
    default: false,
  },
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
