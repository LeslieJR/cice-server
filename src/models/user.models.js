const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    //when the user uses google to sign in 
    google_id:{
      type:String
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    role: {
      type: Number,
      required: true,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    user_details: {
      type: Schema.Types.ObjectId,
      ref: "User_details",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//the model = (name, schema) -> collection
const UserModel = model("User", UserSchema);
module.exports = UserModel;
