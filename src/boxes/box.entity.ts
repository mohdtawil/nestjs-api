import Author1 from "src/authors/auhtor.entity";
import Genre1 from "src/genres/genre.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Box1 {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    picture: string;

    @Column()
    authorId: number;

    // @Column()
    // genres: string;

    
    @ManyToOne(() => Author1, author => author.boxs)
    author: Author1;


    @ManyToMany(() => Genre1, genre => genre.boxes)
    @JoinTable()
    genres: Genre1[];
}