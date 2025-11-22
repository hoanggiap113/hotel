export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const checkInDate = new Date(
    checkIn.getFullYear(),
    checkIn.getMonth(),
    checkIn.getDate()
  );
  const checkOutDate = new Date(
    checkOut.getFullYear(),
    checkOut.getMonth(),
    checkOut.getDate()
  );

  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const nights = Math.round(diffTime / msPerDay);
  return nights > 0 ? nights : 1;
};

export const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

