import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Box1 from 'src/boxes/box.entity';
import { Repository } from 'typeorm';
import Author1 from './auhtor.entity';

@Injectable()
export class AuthorsService {
    constructor(@InjectRepository(Author1)private auhtorRepository: Repository<Author1>) {}

    getAll(): Promise<Author1[]> {
        return this.auhtorRepository.find();
    }

    async findOneById(id: number): Promise<Author1> {
        try {
            const auhtor = await this.auhtorRepository.findOneOrFail(id);
            return auhtor;
        } catch (error) {
            throw error;
        }
    }

    async newAuhtor(authorParam: Author1): Promise<Author1> {
        const author = await this.auhtorRepository.create(authorParam);
        return this.auhtorRepository.save(author);
    }

    async updateAuthor(id: number, authorParam: Author1): Promise<Author1> {
        var author = await this.findOneById(id);
        
        author = authorParam;

        return this.auhtorRepository.save(author)
    }

    async deleteAuthor(id: number): Promise<Author1> {
        const author = await this.findOneById(id);
        return this.auhtorRepository.remove(author);
    }
}
