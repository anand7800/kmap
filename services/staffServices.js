let studentDao = require('../Dao/studentDao'),
    userDao = require('../Dao/userDao'),
    staffDao = require('../Dao/satffDao')
util = require('../utilities/util');

let async = require('async'),
    jwt = require('jsonwebtoken'),
    md5 = require('md5');


let getApplication = (data, header, callback) => {

    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!header.token) {
                callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            } else {
                jwt.verify(header.token, util.secrate.jwtSecrate, function (err, decoded) {
                    if (err) {
                        callback(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN });
                    } else {
                        var criteria = { id: decoded.id }
                        var criteria2 = { post: 1 }
                        userDao.getTeacher(criteria, criteria2, (err, dbData) => {
                            if (err) {
                                cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                                return;
                            } else {
                                console.log(dbData);
                                cb(null, dbData);
                            }
                        })
                    }
                })
            }
        },
        getApplication: ['checkUserExistsinDB', (functionData, cb) => {
            let post = functionData.checkUserExistsinDB.post;
            //console.log('fffffff',post[0]);
            // post =post[0]
            console.log('fffffff', post);
            let criteria = {$in: post[0] },
                criteria2 = {}
            studentDao.test(criteria, criteria2, (err, dbData) => {
                if (err) {
                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                    return;
                } else {
                    cb(null, dbData);
                }
            })
        }],
        applications : ['getApplication',(functionData,cb)=>{
            var getApplication= functionData.getApplication;
            for(var x of getApplication){
                studentDao.getApplication()
            }
        }
    ]
    }, (err, res) => {
        callback(null, res);
    })
}




//=================================================
module.exports = {
    getApplication: getApplication
}