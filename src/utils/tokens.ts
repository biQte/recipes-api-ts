import * as jwt from "jsonwebtoken";
import "dotenv/config";
import * as fs from "fs";
import { User } from "./../entity/user";

const issuer = process.env.JWT_ISSUER;
const privateKey = fs.readFileSync("./src/id_rsa_priv.pem");
const publicKey = fs.readFileSync("./src/id_rsa_pub.pem");

export async function generateAccessToken(user: User) {
  const accessTokenPayload = {
    sub: user.id,
    iss: issuer,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  return jwt.sign(accessTokenPayload, privateKey, { algorithm: "RS256" });
}

export async function generateRefreshToken(user: User) {
  const refreshTokenPayload = {
    sub: user.id,
    iss: issuer,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };
  return jwt.sign(refreshTokenPayload, privateKey, { algorithm: "RS256" });
}

export async function verifyToken(token: string) {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"], issuer });
}
