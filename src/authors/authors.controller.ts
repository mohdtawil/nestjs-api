import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Author1 from './auhtor.entity';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
    
    constructor(private authorsServices: AuthorsService) {}
    
    @Get()
    getAll() {
        return this.authorsServices.getAll();
    }

    @Post('/new')
    newAuthor(@Body() author: Author1) {
        return this.authorsServices.newAuhtor(author);
    }

    @Put('/:id')
    updateAuthor(@Body() author: Author1, @Param('id') id: number) {
        return this.authorsServices.updateAuthor(id, author);
    }

    @Delete('/:id')
    deleteAuthor(@Param('id') id: number) {
        return this.authorsServices.deleteAuthor(id);
    }

}
