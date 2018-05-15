import crypto from "crypto";

// node md5加密
const md5Encrypt = function (encryptString) {
    let md5 = crypto.createHash("md5");
    md5.update(encryptString);
    let md5String = md5.digest("hex");
    return md5String;
};

const Utils = {
    md5Encrypt: md5Encrypt
}

export default Utils;
