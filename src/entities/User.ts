import { IsEmail, Length } from "class-validator";
import { Entity, Column, Index, BeforeInsert } from "typeorm"
import bcrypt from 'bcrypt';
import { Exclude, plainToClass } from "class-transformer";
import CoreEntity from "./Entity";

@Entity('users')
export default class User extends CoreEntity {
  @Index()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3)
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Length(5)
  @Column()
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
  
  toJSON() {
    return plainToClass(User, this);
  }
}
