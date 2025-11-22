"use client";

import { App } from 'antd';
import { useEffect } from 'react';

export default function AntdMessageListener() {
  const { message } = App.useApp(); 

  useEffect(() => {
    const handleMessage = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { type, message: msgContent } = customEvent.detail;

      switch (type) {
        case 'success':
          message.success(msgContent);
          break;
        case 'error':
          message.error(msgContent);
          break;
        case 'warning':
          message.warning(msgContent);
          break;
        case 'info':
          message.info(msgContent);
          break;
        default:
          console.warn('Loại message không xác định:', type);
          break;
      }
    };

    document.addEventListener('ANTD_MESSAGE', handleMessage);

    return () => {
      document.removeEventListener('ANTD_MESSAGE', handleMessage);
    };
  }, [message]); 

  return null;
}