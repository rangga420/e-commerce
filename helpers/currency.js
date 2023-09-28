const currencyIDR = (num) => {
  return num.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

module.exports = currencyIDR