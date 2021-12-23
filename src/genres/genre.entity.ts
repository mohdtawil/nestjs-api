import Box1 from "src/boxes/box.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Genre1 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=> Box1, box => box.genres)
    boxes: Box1[];
}