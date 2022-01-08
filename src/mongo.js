const mongoose = require('mongoose');
const config = require('./config')
const dbname = config.database.uri
const options = {
   useNewUrlParser: true, 
   useUnifiedTopology: true
}
mongoose.connect(dbname, options)
.then(()=>{
 console.log('Connection was successful') 
})
.catch((err)=>{
 console.log('there was an error',err);
})
