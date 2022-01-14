const { Schema, model } = require("mongoose");

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;
