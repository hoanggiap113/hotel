
type MessageType = 'success' | 'error' | 'info' | 'warning';

/**
 * Phát ra một sự kiện tùy chỉnh để AntdMessageListener bắt lấy.
 * @param message - Nội dung thông báo
 * @param type - Loại thông báo (success, error, ...)
 */
export const dispatchAntdMessage = (
  message: string,
  type: MessageType = 'error'
) => {
  if (typeof window !== 'undefined') {
    document.dispatchEvent(
      new CustomEvent('ANTD_MESSAGE', {
        detail: { type, message },
      })
    );
  }
};