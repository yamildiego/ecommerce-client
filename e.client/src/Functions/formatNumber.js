const formatNumber = (number, decimals = 2) => {
  let num = Math.trunc(number * 100) / 100;
  let v = num.toString().split(".");
  let f = v[1] || "";

  while (f.length < decimals) f += "0";

  return decimals === 0 ? `${v[0]}` : `${v[0]}.${f}`;
};

export default formatNumber;
