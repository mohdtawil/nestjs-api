import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { first } from 'rxjs';
import Author1 from 'src/authors/auhtor.entity';
import Genre1 from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/genres.service';
import { Equal, getConnection, In, Like, Repository } from 'typeorm';
import Box1 from './box.entity';
const fs = require('fs');
const {join} = require('path');

import {
    paginate,
    Pagination,
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
  

@Injectable()
export class BoxesService {
    constructor(@InjectRepository(Box1)private boxRerository: Repository<Box1>, private genresServices: GenresService) {}

    getAll(): Promise<Box1[]> {
        return this.boxRerository.find({relations: ['author', 'genres']});
    }

    findOneById(id: number): Promise<Box1> {
        try {
            const box = this.boxRerository.findOneOrFail(id);
            return box;
        } catch (error) {
            throw error;
        }
    }

    async newBox(box1: Box1): Promise<Box1> {
        var box = await this.boxRerository.create(box1);
        
        // add genres list to box
        var genres = [];
        const str = String(box1.genres);
        var arrayString = str.replace("[", "").replace("]", "").split(",");
        for (let index = 0; index < arrayString.length; index++) {
            var genre = new Genre1();
            genre.id = Number(arrayString[index]);
            genres.push(genre);
        }
        box.genres = genres;
        
        return this.boxRerository.save(box);
    }

    async updateBox(id: number , box1: Box1): Promise<Box1> {
        var box = await this.findOneById(id);
        
        box1.id = box.id;
        if(!box1.picture) {
            box1.picture = box.picture;
        }
        box = box1;

        return this.boxRerository.save(box);
    }

    async deleteBox(id: number): Promise<Box1> {
        const box = await this.findOneById(id);
        if(box.picture.length == 0) {
            var path = join(process.cwd(), 'uploads', box.picture);
            fs.unlinkSync(path);
        }
        
        return this.boxRerository.remove(box);
    }

    async searchThroughQuery(query: string): Promise<Box1[]> {
       return this.boxRerository.find({
        relations: ['author', 'genres'],
            where : [{title : Like(`%${query}%`)} , {description : Like(`%${query}%`)}]
        });
    }

    async searchThroughQueryAithAuthor(author: string, query: string): Promise<Box1[]> {
        console.log(author);
        return this.boxRerository.find({
         relations: ['author', 'genres'],
             where : [ {author : {name: Like(`${author}`)}, title : Like(`%${query}%`), description : Like(`%${query}%`) }]
         });
    }

    async filterGenres(genres: string): Promise<Box1[]> {

        // return this.boxRerository.find({
        //     relations: ['author', 'genres'],
        //     where : {'genres.id': Equal(3)  }
        //     //where: { genres: [{id: Like(3)}]}
           
        // });

        // var data = await getConnection()
        //     .getRepository(Box1)
        //     .createQueryBuilder("box")
        //     .where('box.genres @> ARRAY[:...genres]', { genres: [3]})
        //     .getMany();
        //     return data;
        return;
      
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Box1>> {
        const queryBuilder = this.boxRerository.createQueryBuilder('c');
        queryBuilder.orderBy('c.title', 'DESC');
        return paginate<Box1>(queryBuilder, options);
      }
  

}
