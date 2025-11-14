import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  Request,
  RestBindings,
  Response,
  HttpErrors,
} from '@loopback/rest';
import multer from 'multer';
import cloudinary from '../config/cloudinary.config';

export class FileUploadController {
  constructor(
    @inject('middleware.FileUploadProvider')
    private fileUpload: multer.Multer,
  ) {}

  @post('/files')
  async uploadFiles(
    @requestBody({
      description: 'multipart/form-data',
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {
            type: 'object',
            properties: {
              files: {
                type: 'array',
                items: {type: 'string', format: 'binary'},
              },
            },
          },
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const uploadHandler = this.fileUpload.array('files', 10);

    return new Promise((resolve, reject) => {
      uploadHandler(request as any, response as any, async (err: any) => {
        if (err) return reject(err);

        const files = (request as any).files;
        if (!files || files.length === 0) {
          return reject(
            new HttpErrors.BadRequest('Không có file nào được tải lên.'),
          );
        }

        const urls: string[] = [];

        try {
          for (const file of files) {
            const base64 = file.buffer.toString('base64');
            const dataURI = `data:${file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
              folder: 'room',
            });

            urls.push(result.secure_url);
          }

          resolve({urls});
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
