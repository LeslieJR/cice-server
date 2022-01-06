const mongoose = require('mongoose');
const config = require('./config')

mongoose.connect(config.database.uri)
  .then(()=>{
      console.log('Connection to DB successful')
  })
  .catch((err)=>{
      console.log('error: '+err.message)
  })

