export const formatPrice = (price) => {
  if (price < 1_000_000_000) {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(price);
  }

  const units = ["tỷ", "triệu tỷ"];
  let index = 0;

  let formattedPrice = price;
  while (formattedPrice >= 1_000_000_000 && index < units.length) {
    formattedPrice /= 1_000_000_000;
    index++;
  }

  return `${formattedPrice.toFixed(1)} ${units[index]}`;
};
