import { NextFunction, Request, Response } from "express";
import { User } from "./../entity/user";
import { Password } from "./../entity/password";
import { Session } from "./../entity/session";
import { AppDataSource } from "./../data-source";
import { genPassword, validPassword } from "./../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "./../utils/tokens";

export class userController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, userRepository } = await userController.userExists(
        req.body.email
      );
      if (!!user) {
        res.status(401);
        res.json({ msg: "User with provided email already exists!" });
      } else {
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
        session.signInUserAgent = req.headers["user-agent"];
        session.signInIpAddress = req.ip;
        session.lastUserAgent = req.headers["user-agent"];
        session.lastIpAddress = req.ip;
        session.lastAccessed = new Date();
        await passwordRepo.save(password);
        user.passwords = [password];
        session.accessToken = await generateAccessToken(user);
        session.refreshToken = await generateRefreshToken(user);
        await sessionRepo.save(session);
        user.sessions = [session];
        await userRepository.save(user);
        const userInfo = await userRepository
          .createQueryBuilder("user")
          .where("user.email = :email", { email: req.body.email })
          .getOne();
        res.status(201);
        res.json({
          msg: "Account created successfuly",
          user: userInfo,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { user, userRepository } = await userController.userExists(
      req.body.email
    );
    if (!!user) {
      const passwords = user.passwords;
      const currentPassword = passwords.find((i) => i.current === true);
      if (currentPassword === undefined) {
        return;
      }
      const hash = currentPassword.passwordHash;
      const salt = currentPassword.salt;
      const validatePassword = await validPassword(
        req.body.password,
        hash,
        salt
      );
      const validateRefreshToken = await verifyToken(req.body.refreshToken);
      if (validatePassword && validateRefreshToken) {
        const sessionRepository = AppDataSource.getRepository(Session);
        const matchingSession = user.sessions.find(
          (session) => session.refreshToken === req.body.refreshToken
        );
        let refreshToken: string, accessToken: string;
        if (!!matchingSession) {
          console.log("refresh tokens are matching");
          matchingSession.accessToken = await generateAccessToken(user);
          accessToken = matchingSession.accessToken;
          matchingSession.refreshToken = await generateRefreshToken(user);
          refreshToken = matchingSession.refreshToken;
          matchingSession.lastAccessed = new Date();
          matchingSession.lastIpAddress = req.ip;
          matchingSession.lastUserAgent = req.headers["user-agent"];
          sessionRepository.save(matchingSession);
        } else {
          console.log("refresh tokens are not matching");
          const session = new Session();
          session.signInUserAgent = req.headers["user-agent"];
          session.signInIpAddress = req.ip;
          session.lastUserAgent = req.headers["user-agent"];
          session.lastIpAddress = req.ip;
          session.lastAccessed = new Date();
          session.accessToken = await generateAccessToken(user);
          accessToken = session.accessToken;
          session.refreshToken = await generateRefreshToken(user);
          refreshToken = session.refreshToken;
          await sessionRepository.save(session);
          user.sessions.push(session);
          userRepository.save(user);
        }
        const { sessions, passwords, ...userInfo } = user;
        res.status(200);
        res.json({
          msg: "Login successful",
          user: userInfo,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
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
      relations: {
        passwords: true,
        sessions: true,
      },
    });
    return {
      user,
      userRepository,
    };
  }
}
