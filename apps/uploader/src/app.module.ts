import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/uploader.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/uploader/.env',
    }),
    UploadModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
