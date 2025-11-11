import {inject} from '@loopback/core';
import {
  post,
  requestBody,
  Request,
  response,
  RestBindings,
  Response,
  HttpErrors,
} from '@loopback/rest';
import multer from 'multer';

/**
 * Controller này chỉ xử lý việc tải file lên
 */
export class FileUploadController {
  constructor(
    // Inject provider mà chúng ta đã đăng ký ở Bước 3
    @inject('middleware.FileUploadProvider')
    private fileUpload: multer.Multer,
  ) {}

  @post('/files', {
    responses: {
      '200': {
        description: 'Upload file thành công',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                files: {
                  type: 'array',
                  items: {type: 'string'},
                },
              },
            },
          },
        },
      },
    },
  })
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
  ): Promise<object> {

    const uploadHandler = this.fileUpload.array('files', 10);

    return new Promise((resolve, reject) => {
      uploadHandler(request as any, response as any, (err: any) => {
        if (err) return reject(err); 
        const files = (request as any).files;
        if (!files || (files as Express.Multer.File[]).length === 0) {
        return reject(
          new HttpErrors.BadRequest('Không có file nào được tải lên.'),
        );
      }

        // 4. Lấy danh sách file đã upload
        const uploadedFiles = files as Express.Multer.File[];;

        // 5. Tạo mảng các đường dẫn (URL)
        const filePaths = uploadedFiles.map(file => {
          return `/files/uploads/${file.filename}`;
        });

        // 6. Trả về mảng đường dẫn cho client
        resolve({files: filePaths});
      });
    });
  }
}