import { useState, useEffect } from "react";

// Hàm này sẽ trả về 2 giá trị giống hệt useState: [value, setValue]
export function useSessionStorage<T>(key: string, initialValue: T) {
  // --- Bước 1: Lấy giá trị ban đầu ---
  // Dùng state, nhưng đọc giá trị từ session một cách an toàn
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Chỉ chạy ở client
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Lấy item từ session
      const item = sessionStorage.getItem(key);
      // Parse JSON, nếu không có thì dùng giá trị ban đầu
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // Nếu parse lỗi, dùng giá trị ban đầu
      console.warn(`Lỗi khi parse key “${key}” từ sessionStorage:`, error);
      return initialValue;
    }
  });

  // --- Bước 2: Tạo hàm "setValue" mới ---
  // Hàm này sẽ tự động cập nhật cả state VÀ sessionStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Cho phép truyền giá trị mới hoặc 1 function (giống API của useState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // 1. Cập nhật state
      setStoredValue(valueToStore);

      // 2. Ghi vào sessionStorage (chỉ ở client)
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Lỗi khi set key “${key}” vào sessionStorage:`, error);
    }
  };

  // --- (Bonus) Xử lý Hydration Mismatch trong Next.js ---
  // Đảm bảo state được đồng bộ lại SAU KHI client mount,
  // phòng trường hợp giá trị ban đầu (server) khác với client.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const item = sessionStorage.getItem(key);
      const valueInSession = item ? (JSON.parse(item) as T) : initialValue;
      setStoredValue(valueInSession);
    } catch (error) {
      console.warn(`Lỗi khi đồng bộ key “${key}” từ sessionStorage:`, error);
      setStoredValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]); // Chỉ chạy lại nếu key thay đổi

  return [storedValue, setValue] as const;
}
