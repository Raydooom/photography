const crypto = require('crypto')

// node md5加密
const utils = {
    md5Encrypt: function(encryptString) {
        let md5 = crypto.createHash("md5");
        md5.update(encryptString);
        let md5String = md5.digest("hex");
        return md5String;
    }
};


module.exports = utils;
