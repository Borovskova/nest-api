import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   cors({
  //     origin: 'http://localhost:4200',
  //     optionsSuccessStatus: 200,
  //   })
  // )
  app.enableCors(
    {
      origin: [
        'http://localhost:4200'
      ],
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
      credentials: true,
    }
  );
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ));
  await app.listen(3000);
}
bootstrap();
