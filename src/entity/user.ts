import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Password } from "./password";
import { Session } from "./session";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
  })
  email: string;

  @Column({
    type: "varchar",
  })
  firstName: string;

  @Column({
    type: "varchar",
  })
  surname: string;

  @Column({
    type: "varchar",
  })
  gender: string;

  @Column({
    type: "simple-array",
  })
  permissionLevel: string[];

  @Column({
    type: "boolean",
  })
  verified: boolean;

  @Column({
    type: "boolean",
  })
  disabled: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Password, (password) => password.user)
  passwords: Password[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}
