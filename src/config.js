const config = { 
    database:{
        uri:'mongodb://localhost/'
    },
    server:{
        port: process.env.PORT ?? 4400,
        hostname: 'http://localhost:'+4400
        
    }
}
module.exports = config
