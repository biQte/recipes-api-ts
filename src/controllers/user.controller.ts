import { NextFunction, Request, Response } from "express";
import { User } from "./../entity/user";
import { Password } from "./../entity/password";
import { Session } from "./../entity/session";
import { AppDataSource } from "./../data-source";
import { genPassword, validPassword } from "./../utils/password";
import { userInfo } from "os";

export class userController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userController.userExists(req.body.email);
      if (!!user) {
        res.status(401);
        res.json({ msg: "User with provided email already exists!" });
      } else {
        const userRepo = AppDataSource.getRepository(User);
        const passwordRepo = AppDataSource.getRepository(Password);
        const sessionRepo = AppDataSource.getRepository(Session);
        const user = new User();
        const password = new Password();
        const session = new Session();
        const saltHash = await genPassword(req.body.password);
        password.passwordHash = saltHash.hash;
        password.salt = saltHash.salt;
        password.current = true;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.surname = req.body.surname;
        user.gender = req.body.gender;
        user.permissionLevel = ["user"];
        user.verified = false;
        user.disabled = false;
        user.passwords = [password];

        await passwordRepo.save(password);
        await userRepo.save(user);
        res.status(201);
        res.json({ msg: "Account created successfuly", user: user });
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const user = await userController.userExists(req.body.email);
    if (!!user) {
      const passwords = user.passwords;
      const currentPassword = passwords.find((i) => i.current === true);
      if (currentPassword === undefined) {
        return;
      }
      const hash = currentPassword.passwordHash;
      const salt = currentPassword.salt;
      const validate = await validPassword(req.body.password, hash, salt);
      if (validate) {
        const { passwords, ...userInfo } = user;
        res.status(200);
        res.json({ msg: "Login successful", user: userInfo });
      } else {
        res.status(401);
        res.json({ msg: "Invalid credentials" });
      }
    } else {
      res.status(404);
      res.json({ msg: "User not found" });
    }
  }

  private static async userExists(email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }
}
