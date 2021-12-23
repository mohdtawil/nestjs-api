import { IsEmail, Length, MinLength } from "class-validator";
import Box1 from "src/boxes/box.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Author1 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @MinLength(5)
    name: string;

    @Column()
    // @IsEmail()
    email: string;

    @OneToMany(() => Box1, box => box.author)
    boxs: Box1[];
}