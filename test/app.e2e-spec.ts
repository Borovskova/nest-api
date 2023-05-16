import { Test } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

import * as pactum from 'pactum';

import { AppModule } from '../src/app.module';
import { RegisterDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen('3333');
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: RegisterDto = {
      email: 'comc@mаo3.pd',
      password: '111',
    };
    describe('Signup', () => {
      it('Should throw an error if email empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
        .inspect();
      })
      it('Should throw an error if password empty', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
        .inspect();
      })
      it('Should throw an error if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .expectStatus(400)
        .inspect();
      })
      it('Should Signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('Signin', () => {
      it('Should throw an error if email empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          password: dto.password
        })
        .expectStatus(400)
        .inspect();
      })
      it('Should throw an error if password empty', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody({
          email: dto.email
        })
        .expectStatus(400)
        .inspect();
      })
      it('Should throw an error if no body provided', () => {
        return pactum
        .spec()
        .post('/auth/signin')
        .expectStatus(400)
        .inspect();
      })
      it('Should Signin',  () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userToken', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get user', () => {
      it('should get current user', () =>{
        return pactum
        .spec()
        .get('/users/me')
        .withHeaders({
          Authorization: 'Bearer $S{userToken}' 
        })
        .expectStatus(200)
      })
    });
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by Id', () => {});
    describe('Edit bookmark by Id', () => {});
    describe('Delete bookmark by Id', () => {});
  });
  it.todo('should pass');
});
