import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import console from 'console';
import { diskStorage } from 'multer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { type } from 'os';
import { extname } from 'path';
import { title } from 'process';
import { retry } from 'rxjs';
import Genre1 from 'src/genres/genre.entity';
import { GenresService } from 'src/genres/genres.service';
import Box1 from './box.entity';
import { BoxesService } from './boxes.service';

const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@Controller('boxes')
export class BoxesController {

    constructor(private boxesServices: BoxesService) {}

    @Get('')
    getBoxes() {
        return this.boxesServices.getAll();
    }


    @Get('/filter')
    async index(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    ): Promise<Pagination<Box1>> {
      limit = limit > 100 ? 100 : limit;
      return this.boxesServices.paginate({
        page,
        limit,
        route: 'http://localhost:3000/boxes',
      });
    }


    @Post('/new')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),)
    async newBox(@Body() box: Box1, @UploadedFile() file) {
        box.picture = file.filename;

        return await this.boxesServices.newBox(box);
    }


    @Put('/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }),)
    updateBox(@Body() box : Box1, @Param('id') id: number, @UploadedFile() file) {
        if(file) {
            box.picture = file.filename;
        }
        return this.boxesServices.updateBox(id, box);
    }


    @Delete('/:id')
    deleteBox(@Param('id') id: number) {
        return this.boxesServices.deleteBox(id);
    }

    @Get('/search/:query')
    searchThroughQuery(@Param('query') query: string) {
        return this.boxesServices.searchThroughQuery(query);
    }


    @Get('/search/:author/:query')
    searchThroughQueryWithAuthor(@Param('author') author: string, @Param('query') query: string) {
        return this.boxesServices.searchThroughQueryAithAuthor(author, query);
    }

    @Post('/filter/genres')
    filterGenres(@Body() genres: any) {
        return this.boxesServices.filterGenres(genres);
    }

    
}
