import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Genre1 from './genre.entity';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
    constructor(private genreServices: GenresService) {}

    @Get()
    getAll() {
        return this.genreServices.getAll();
    }

    @Post('/new')
    newGenre(@Body() genre: Genre1) {
        return this.genreServices.newGenre(genre);
    }

    @Put('/:id')
    updateGenre(@Param('id') id: number, @Body() genre: Genre1) {
        return this.genreServices.updateGenre(id , genre);
    }

    @Delete('/:id')
    deleteGenre(@Param('id') id: number) {
       return this.genreServices.removeGenre(id)
    }
}
