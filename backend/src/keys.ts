import {BindingKey} from '@loopback/core';

// Key cho thư mục lưu trữ file
export const STORAGE_DIRECTORY = BindingKey.create<string>('storage.directory');