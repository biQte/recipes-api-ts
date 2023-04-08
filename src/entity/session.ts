import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { StringLiteral } from "typescript";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Column({
    type: "varchar",
  })
  accessToken: string;

  @Column({
    type: "varchar",
  })
  refreshToken: string;

  @Column({
    type: "varchar",
  })
  signInUserAgent: string;

  @Column({
    type: "varchar",
  })
  signInIpAddress: string;

  @Column({
    type: "varchar",
  })
  lastUserAgent: string;

  @Column({
    type: "varchar",
  })
  lastIpAddress: string;

  @Column({
    type: "timestamp",
  })
  lastAccessed: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  sudoModeActivated: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  sudoModeExpires: Date;

  @CreateDateColumn()
  firstAccessed: string;
}
