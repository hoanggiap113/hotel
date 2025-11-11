import {Provider, inject} from '@loopback/core';
import multer from 'multer';
import path from 'path';
import {HttpErrors} from '@loopback/rest';

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(__dirname, '../../public/uploads'); 
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất để tránh trùng lặp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Cấu hình multer
const multerOptions: multer.Options = {
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Chỉ chấp nhận file ảnh
    if (!file.mimetype.startsWith('image/')) {
      return cb(new HttpErrors.BadRequest('Chỉ hỗ trợ file ảnh.'));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
};

export class MulterFileUploadProvider implements Provider<multer.Multer> {
  constructor() {}

  value(): multer.Multer {
    return multer(multerOptions);
  }
}