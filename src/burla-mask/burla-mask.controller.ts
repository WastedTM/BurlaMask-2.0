import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';

@Controller('sendData')
@UseInterceptors(FilesInterceptor('images', 2))
export class BurlaMaskController {
  @Post()
  async processImages(@UploadedFiles() images) {
    const newImageNames = [];

    for (const image of images) {
      if (!image.buffer) {
        continue;
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = `${uniqueSuffix}.jpg`;

      const drawableFolder = path.join(
        __dirname,
        '..',
        '..',
        'frontend',
        'drawable',
      );
      const imagePath = path.join(drawableFolder, filename);
      fs.writeFileSync(imagePath, image.buffer);

      newImageNames.push(filename);
    }

    try {
      const pythonServerUrl = 'http://127.0.0.1:3001';
      const response = await axios.post(
        pythonServerUrl + '/processData',
        newImageNames,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { image1, image2, message } = response.data;

      const responseData = {
        image1,
        image2,
        message,
      };

      return responseData;
    } catch (error) {
      return {
        message: 'Помилка під час взаємодії з сервером Python',
        error: error.message,
      };
    }
  }
}
