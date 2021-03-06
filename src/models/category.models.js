const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    color:{
      type:String,
      unique: true,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CategoryModel = model("Category", CategorySchema);
module.exports = CategoryModel;
