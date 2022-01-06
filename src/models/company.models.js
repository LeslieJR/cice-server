const { Schema, model } = require('mongoose');
 
const CompanySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    story:{
        type:String,
        required:true
    },
    images:[{
        type:String,
        required:true
    }]
});
 
//the model = (name, schema) -> collection
const CompanyModel =model('Company', CompanySchema);
module.exports = CompanyModel;