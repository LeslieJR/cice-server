const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      min: 5,
      max: 100,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one image is required",
      },
    },
    quantity: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const ProductModel = model("Product", ProductSchema);
module.exports = ProductModel;
