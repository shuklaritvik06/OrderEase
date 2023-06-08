import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploaderService } from '../services/uploader.service';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from '@app/shared';

@Controller('api/v1/upload')
@UseGuards(AuthGuard)
export class UploaderController {
  constructor(
    private readonly uploadService: UploaderService,
    @Inject('VIDEO_SERVICE') private videoService: ClientProxy,
  ) {}

  @Post('file')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() file: Express.Multer.File[]) {
    const fileReponse = {
      originalname: file[0].originalname,
      mimetype: file[0].mimetype,
      id: file[0].id,
      filename: file[0].filename,
      bucketName: file[0].bucketName,
      chunkSize: file[0].chunkSize,
      size: file[0].size,
      uploadDate: file[0].uploadDate,
      contentType: file[0].contentType,
    };
    this.videoService.emit('video_uploaded', {
      id: file[0].id,
    });
    return fileReponse;
  }
  @Get('file/:id')
  async readFile(@Param('id') id: string, @Res() res) {
    const stream = await this.uploadService.readFile(id);
    stream.pipe(res);
  }
  @Delete('file/:id')
  async delete(@Param('id') id: string) {
    return await this.uploadService.deleteFile(id);
  }
  @Get('fileinfo/:id')
  async info(@Param('id') id: string) {
    return await this.uploadService.infoFile(id);
  }
}
