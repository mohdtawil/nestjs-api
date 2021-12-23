import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return  `
      <h1>Hello World!<h1/>  
      <a href="/boxes">boxes</a>
      <a href="/authors">authors</a>
    `;
  }
}
