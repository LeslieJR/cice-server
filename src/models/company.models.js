const { Schema, model } = require("mongoose");

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//the model = (name, schema) -> collection
const CompanyModel = model("Company", CompanySchema);
module.exports = CompanyModel;
