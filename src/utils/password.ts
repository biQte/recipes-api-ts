import * as crypto from "crypto";

export async function genPassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 1000000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

export async function validPassword(
  password: string,
  hash: string,
  salt: string
) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000000, 64, "sha512")
    .toString("hex");
  return (hash = hashVerify);
}
