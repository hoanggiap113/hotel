import {Provider} from '@loopback/core';
import multer from 'multer';
import {HttpErrors} from '@loopback/rest';

export class MulterFileUploadProvider implements Provider<multer.Multer> {
  constructor() {}

  value(): multer.Multer {
    return multer({
      storage: multer.memoryStorage(), 
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new HttpErrors.BadRequest('Chỉ hỗ trợ file ảnh'));
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    });
  }
}
