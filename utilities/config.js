let environment = require('./environment').environment;
let nodemailer = require('nodemailer');


let serverURLs = {
    "dev": {
        "NODE_SERVER": "http://localhost",
        "NODE_SERVER_PORT": "3002",
        "MONGO_DB": "mongodb://localhost:27017/k-map",
        "MYSQL_HOST": 'localhost',
        "MYSQL_USER": 'root',
        "MYSQL_PASSWORD": 'parsupur',
        'MYSQL_DATABASE': 'k-map',
        'EMAIL_USER' : 'test.techugo@gmail.com',
        'EMAIL_PASSWORD' : 'LUCKY@05',
        'EMAIL_SERVICES' : 'gmail'
    }
}

let config = {
               
           
    "DB_URL_MYSQL": {
        "host": `${serverURLs[environment].MYSQL_HOST}`,
        "user": `${serverURLs[environment].MYSQL_USER}`,
        "password": `${serverURLs[environment].MYSQL_PASSWORD}`,
        "database": `${serverURLs[environment].MYSQL_DATABASE}`
    },
    "DB_URL": {
        "url": `${serverURLs[environment].MONGO_DB}`
    },
    "MYSQL": {
        "host": `${serverURLs[environment].MYSQL_HOST}`,
        "user": `${serverURLs[environment].MYSQL_USER}`,
        "password": `${serverURLs[environment].MYSQL_PASSWORD}`,
        "database": `${serverURLs[environment].MYSQL_DATABASE}`,
    },    
    "NODE_SERVER_PORT": {
        "port": `${serverURLs[environment].NODE_SERVER_PORT}`
    },
    "NODE_SERVER_URL": {
        "url": `${serverURLs[environment].NODE_SERVER}`
    },
    "MONGO_URI": {
        "uri": `${serverURLs[environment].MONGO_DB}`
    },
    "CREATE_TRANSPOTER": {
      "tranporter" : nodemailer.createTransport({
                service: `${serverURLs[environment].EMAIL_SERVICES}`,
                auth: {
                user: `${serverURLs[environment].EMAIL_USER}`,
                pass: `${serverURLs[environment].EMAIL_PASSWORD}`
            }
      })
    },
    "FORGOTPASSWORD_LINK" : {
        "link" : `${serverURLs[environment].NODE_SERVER}`+":"+
        `${serverURLs[environment].NODE_SERVER_PORT}`   
    }
};

module.exports = {
    config: config,
    serverURLs: serverURLs
};
