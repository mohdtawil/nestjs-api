import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import  databaseConfig  from '../databaseConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxesController } from './boxes/boxes.controller';
import { BoxesService } from './boxes/boxes.service';
import { BoxesModule } from './boxes/boxes.module';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsService } from './authors/authors.service';
import { AuthorsModule } from './authors/authors.module';

import Box1 from './boxes/box.entity';
import Author1 from './authors/auhtor.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenresController } from './genres/genres.controller';
import { GenresService } from './genres/genres.service';
import { GenresModule } from './genres/genres.module';
import Genre1 from './genres/genre.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig), 
    TypeOrmModule.forFeature([Box1, Author1, Genre1]), 
    BoxesModule, 
    AuthorsModule, 
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd() , 'uploads'),
    }),
    GenresModule,
  ],
  controllers: [AppController, BoxesController, AuthorsController, GenresController],
  providers: [AppService, BoxesService, AuthorsService, GenresService],
})
export class AppModule {}
