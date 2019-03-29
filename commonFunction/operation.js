let MD5 = require('md5');
var util = require('../utilities/util')
var serverUrls = require('../utilities/config');
var transporter = require('../utilities/config').config.CREATE_TRANSPOTER.tranporter


let encryptData = (stringToCrypt) => {
    return MD5(MD5(stringToCrypt));
};

let sendEmail = (mailOptions,cb)=>{

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          cb(null,{"code": util.statusCode.OK,"message": util.statusMessage.EMAIL_SENT,
           "result":info});
        }
      });
}
module.exports = {
    encryptData: encryptData,
    sendEmail: sendEmail
}