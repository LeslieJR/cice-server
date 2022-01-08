const { Schema, model } = require("mongoose");

const UserDetailsSchema = new Schema(
  {
    address:{
        city: {
            type:String
        },
        postal_code: {
            type:String
        },
        country: {
            type:String
        }
    },
    mobile: {
        type: Number,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserDetailsModel = model("User_Details", UserDetailsSchema);
module.exports = UserDetailsModel;
