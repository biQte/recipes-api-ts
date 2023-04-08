import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Password {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
  })
  passwordHash: string;

  @Column({
    type: "varchar",
  })
  salt: string;

  @Column({
    type: "boolean",
  })
  current: boolean;

  @ManyToOne(() => User, (user) => user.passwords)
  user: User;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: string;
}
