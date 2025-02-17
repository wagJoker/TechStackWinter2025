import { Controller, Post, UploadedFile, UseInterceptors, Logger, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

const uploadPath = './uploads';

@Controller('upload')
export class UploadController {
  // Instantiating the logger ensures that `this.logger` is defined.
  private readonly logger = new Logger(UploadController.name);

  constructor() {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      this.logger.log(`Folder ${uploadPath} created.`);
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadPath,
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${fileExtName}`;
          // Now that logger is defined, this call won't cause the error.
         //this.logger.log(`Saving file: ${filename}`);
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    this.logger.log(`File uploaded: ${file.filename}`);
    return { url: `http://localhost:3000/uploads/${file.filename}` };
  }
}