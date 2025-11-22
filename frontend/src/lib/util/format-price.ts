const formatPrice = (price?: number): string => {
  if (price === undefined || price === null) return "";
  return price.toLocaleString("vi-VN") + " ₫";
};  
export default formatPrice;