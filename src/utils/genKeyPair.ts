import * as fs from "fs";
import * as crypto from "crypto";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

fs.writeFileSync("id_rsa_pub.pem", publicKey);
fs.writeFileSync("id_rsa_priv.pem", privateKey);
