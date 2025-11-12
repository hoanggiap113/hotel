const formatPrice = (price?: number): string => {
  if (price === undefined || price === null) return "";
  // Sử dụng toLocaleString để thêm dấu chấm/phẩy phân cách hàng nghìn
  return price.toLocaleString("vi-VN") + " ₫";
};
export default formatPrice;