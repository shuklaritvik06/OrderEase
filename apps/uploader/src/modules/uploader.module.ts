import { Module } from '@nestjs/common';
import { UploaderService } from '../services/uploader.service';
import { UploaderController } from '../controllers/uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule, GuardsModule } from '@app/shared';
import { GridFsStorage } from 'multer-gridfs-storage';
import { randomBytes } from 'crypto';
import { extname } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    GuardsModule,
    ClientsModule.register([
      {
        name: 'VIDEO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'video_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    MulterModule.register({
      storage: new GridFsStorage({
        options: {},
        url: process.env.DB_URI,
        file: (req, file) => {
          return new Promise((resolve, reject) => {
            randomBytes(16, (err, buf) => {
              if (err) {
                return reject(err);
              }
              const filename = buf.toString('hex') + extname(file.originalname);
              const fileInfo = {
                filename: filename,
                bucketName: 'videos',
              };
              resolve(fileInfo);
            });
          });
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(mp4|avi|mkv|webm)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Only video files are allowed!'), false);
        }
      },
    }),
  ],
  providers: [JwtService, UploaderService],
  controllers: [UploaderController],
})
export class UploadModule {}
