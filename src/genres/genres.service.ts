import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Genre1 from './genre.entity';

@Injectable()
export class GenresService {

    constructor(@InjectRepository(Genre1) private genreRepository: Repository<Genre1>) {}

    getAll(): Promise<Genre1[]> {
        return this.genreRepository.find();
    }

    findOneById(id: number): Promise<Genre1> {
        try {
            return  this.genreRepository.findOneOrFail(id);
        } catch (error) {
            throw error;
        }
    }

    async newGenre(genre1: Genre1): Promise<Genre1> {
        const genre = await this.genreRepository.create(genre1);
        return this.genreRepository.save(genre);
    }

    async updateGenre(id: number, genre1: Genre1): Promise<Genre1> {
        var genre = await this.findOneById(id);
        genre1.id = genre.id;
        genre = genre1;
        return this.genreRepository.save(genre);
    }

    async removeGenre(id: number): Promise<Genre1> {
        const genre = await this.findOneById(id);
        return this.genreRepository.remove(genre);
    }

}
