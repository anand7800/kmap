let config = require("./config").config,
    MD5 = require('md5'),
    bodyParser = require('body-parser');
//let querystring = require('querystring');
//let cityDetail = require('../Utilities/cityDetail.json');

//let FCM = require('fcm-node');


let htmlEnDeCode = (function() {
    var charToEntityRegex,
        entityToCharRegex,
        charToEntity,
        entityToChar;

    function resetCharacterEntities() {
        charToEntity = {};
        entityToChar = {};
        // add the default set
        addCharacterEntities({
            '&amp;': '&',
            '&gt;': '>',
            '&lt;': '<',
            '&quot;': '"',
            '&#39;': "'"
        });
    }

    function addCharacterEntities(newEntities) {
        var charKeys = [],
            entityKeys = [],
            key, echar;
        for (key in newEntities) {
            echar = newEntities[key];
            entityToChar[key] = echar;
            charToEntity[echar] = key;
            charKeys.push(echar);
            entityKeys.push(key);
        }
        charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
        entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
    }

    function htmlEncode(value) {
        var htmlEncodeReplaceFn = function(match, capture) {
            return charToEntity[capture];
        };

        return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
    }

    function htmlDecode(value) {
        var htmlDecodeReplaceFn = function(match, capture) {
            return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
        };

        return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
    }

    resetCharacterEntities();

    return {
        htmlEncode: htmlEncode,
        htmlDecode: htmlDecode
    };
})();

// Define Error Codes
let statusCode = {
    OK: 200,
    FOUR_ZERO_ONE: 401,
    TWO_ZERO_ONE: 201,
    TWO_ZERO_TWO: 202,
    INTERNAL_SERVER_ERROR:400,
    FOUR_ZERO_ZERO: 400,   
    BAD_REQUEST: 404,
    FIVE_ZERO_ZERO: 500,
    THREE_ZERO_ZERO: 300,
    THREE_ZERO_ONE: 301,
    THREE_THREE_THREE: 333,
    DELERROR: 999,
};
// Define Error Messages
let statusMessage = {
    REGISTRATION_DONE: 'Registration done successfully.',
    INCORRECT_ID_PASSWORD : 'Please enter correct id password.',
    DOC_UPDATED : 'Document update successfully!',
    INVALID_ID : 'Invalid student id',
    INVALID_TOKEN: 'invalid token',
    INVALID_TUTOR_ID : 'Invalid tutor id',
    INVALID_TUTOR : 'Invalid tutor, Please try later.',
    STATUS_UPDATED : 'Status updated successfully!.',
    LIST_FETCHED: 'List fetched successfully.',
    DATA_FETCHED: 'Data fetched successfully.',
    PAGE_NOT_FOUND: 'Page not found', //404
    SOMETHING_WENT_WRONG: 'Something went wrong.',
    DATA_UPDATED: 'Data updated successfully.',
    PARAMS_MISSING : 'Parameters are missing!',
    REQUEST_SENT: 'Booking request has been sent successfully.',
    SERVER_BUSY : 'Our Servers are busy. Please try again later.',
    EMAIL_ALREADY_REGISTERED : 'Email already registered, Try another.',
    ID_ALREADY_REGISTERED : 'Id already registered, Try another.',
    PHONE_ALREADY_REGISTERED : 'Phone already registered, Try another.',
    PHONE_NOT_REGISTERED : 'Phone number is not registered, Try another',
    OTP_VERIFY: 'Activation email has sent to your registered email, please go through the link sent.',
    LINK_EXPIRED : 'Above link has expired. Please try again.',
    INVALID_LINK : 'Link is invalid, Please try again.',
    USER_REGISTERED_SUCCESSFULLY : 'You have registered successfully. Please login to continue',
    PLEASE_SIGNUP_FIRST: 'Your email is not Registered, Please Sign up First.',
    LOGGED_IN: 'You have sucessfully Logged in',

    NO_TUTOR_ONLINE : 'No any tutor online now.',
    ENTER_VALID_CUSTOMERID_PASS: 'Please enter your valid email and password.',
    EMAIL_NOT_EXIST: 'Your Email address is not registered, please Sign up to continue.',
    OTP_VERIFY_SUCCESS: ' Set your new password.',
    PLEASE_ENTER_VALID_EMAIL: 'Please enter valid email ',
    SOCIAL_ACCOUNT : 'forget password is not requested because its social login',
    REMOVED: 'application removedd sucessfully',
    APPLICATION_DOES_NOT_EXIST: 'the given application does not exist',
	OTP_VERIFY_EMAIL: 'Activation message has sent to your registered email, please go through the OTP sent.',
    INVALID_OTP : 'OTP is invalid, Please try again.',
    OTP_EXPIRED : 'Above otp has expired. Please try again.',
	VERIFY_EMAIL : 'Email verification has sent to your registered email, please go through the link sent.',
    EMAIL_VERIFIED : 'Congratulations! Your email has verified successfully!',
    EMAIL_ALREADY_VERIFIED: 'Email has  been already verified!.',
    PASSWORD_CHANGED: 'Your Password has changed successfully.',
    ADDED_FAVOURITE : 'Coin added as favourite',
    ALREADY_ADDED : 'given id is alredy added',
    COIN_REMOVED : 'Coin removed from favourite',
    ADDED_IN_WATCHLIST : 'Coin added in watchlist',
    ALREADY_ADDED_WATCHLIST : 'coin already in watchlist.',
    NO_DATA : '0 record found',
	EMAIL_NOT_EXISTS: 'First sign up to the app.',
    PROFILE_UPDATED : 'Profile updated successfully!',
    TODAY_PREFRENCES : 'Your todays prefrences is update',
    PRIORITY_UPDATED :'Student priority has been updated',
    DEVICE_TOKEN: 'Device token has been updated successfully',
    DELETE_STATUS: 'A user account has been deleted successfully',
    DATABASE_CONNECTION_FAILED: 'database connection failed',
    DATABASE_CONNECTED: 'databse connected',
    DB_ERR: 'database related error',
    DATA_NOT_FOUND : 'data not found',
    EMAIL_SENT: 'check your inbox',
    FORGOT_PASSWORD: 'forgot password',
    SUCCESS: 'sucess',
    APPLICATION_SENT : 'application sent sucesssfully',
    EVENT_CREATED: 'event created',
    PARTICIPENT_ADDED: 'participent added sucessfully',
    APPROVED: 'your application is approved now',
    APPLICATION_CANCLED: 'application is cancled now',
    ALREADY_APPROVED: 'can not be approved or cancled anymore',
    CAN_NOT_BE_PROCESSED: 'this application can not be processed'


};

let encryptData = (stringToCrypt) => {
    return MD5(MD5(stringToCrypt));
};

let sendForgotPasswordMail = (data) => {
    var mailOptions = {
        from: templates.forgotPasswordMailTemplate.from,
        to: data.email,
        subject: templates.forgotPasswordMailTemplate.subject,
        html: mustache.render(templates.forgotPasswordMailTemplate.html, data)
    };
    mailModule.sendMail(mailOptions);
}

let sendEmailVerificationMail = (data) => {
    var mailOptions = {
        from: templates.emailVerifiedMailTemplate.from,
        to: data.email,
        subject: templates.emailVerifiedMailTemplate.subject,
        html: mustache.render(templates.emailVerifiedMailTemplate.html, data)
    };
    mailModule.sendMail(mailOptions);
}
let secrate ={
    jwtSecrate : "Anand"
}


module.exports = {
    statusCode: statusCode,
    statusMessage: statusMessage,
    encryptData : encryptData,
    sendForgotPasswordMail : sendForgotPasswordMail,
    sendEmailVerificationMail: sendEmailVerificationMail,
    secrate: secrate
}
