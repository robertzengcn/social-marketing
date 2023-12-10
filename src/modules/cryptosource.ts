'use strict';
export {};
//Checking the crypto module
import crypto from 'crypto';
export type encrytext={
    iv:string,
    encryptedData:string
}
export class cryptoSource {
    private algorithm:string = 'aes-256-cbc'; //Using AES encryption
    private key:Buffer;
    private iv:Buffer = crypto.randomBytes(16);
    constructor() {
        this.algorithm = 'aes-256-cbc'; //Using AES encryption
        this.key = Buffer.from("social-market-key",'utf8');
        this.iv = crypto.randomBytes(16);
    }
    //Encrypting text
    encrypt(text:string):encrytext {
        let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: this.iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
    // Decrypting text
    decrypt(text:encrytext):string {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}


//Encrypting text
// function encrypt(text) {
//    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// Decrypting text
// function decrypt(text) {
//    let iv = Buffer.from(text.iv, 'hex');
//    let encryptedText = Buffer.from(text.encryptedData, 'hex');
//    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }
//}