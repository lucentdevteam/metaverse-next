const CONFIG = require("../config");
const CustomError = require('../middleware/errors/CustomError');
const crypto = require("crypto");
const algorithm = "aes-256-ctr";

exports.cryptoEncryption = (message) => {
  try {
    const SALT = 'somethingrandom';
    const IV_LENGTH = 16;
    let key = crypto.pbkdf2Sync(CONFIG.cryptoPassword, SALT, 10000, 32, 'sha512')
    const NONCE_LENGTH = 5;
    let nonce = crypto.randomBytes(NONCE_LENGTH);
    let iv = Buffer.alloc(IV_LENGTH)
    nonce.copy(iv)
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message.toString());
    message = Buffer.concat([nonce, encrypted, cipher.final()]);
    let encryptedData = message.toString('hex')
    return encryptedData
  } catch (error) {
    console.log(error);
    throw new CustomError(401, 'Unauthorized')
  }
}

exports.cryptoDecryption = (text) => {
  try {
    const SALT = 'somethingrandom';
    const IV_LENGTH = 16;
    let key = crypto.pbkdf2Sync(CONFIG.cryptoPassword, SALT, 10000, 32, 'sha512')
    const NONCE_LENGTH = 5;
    let message = Buffer.from(text, 'hex')
    let iv = Buffer.alloc(IV_LENGTH)
    message.copy(iv, 0, 0, NONCE_LENGTH)
    let encryptedText = message.slice(NONCE_LENGTH)
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.log(error);
    throw new CustomError(401, 'Unauthorized')
  }
}