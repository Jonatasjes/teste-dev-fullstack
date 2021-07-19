export const formatPrice = (price: number) => {
  let stringPrice = price.toString();
  if (stringPrice.includes('.')) {
    return `R$ ${stringPrice.replace('.', ',')}${
      stringPrice.split('.')[1].length == 1 ? '0' : ''
    }`;
  }
  return `R$ ${stringPrice.replace('.', ',')},00`;
};