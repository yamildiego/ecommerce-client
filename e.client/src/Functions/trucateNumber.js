const trucateNumber = (number, decimals = 2) => {
  let numberDividerText = "1";
  for (let index = 0; index < decimals; index++) numberDividerText += "0";

  let numberDivider = parseInt(numberDividerText);
  let num = Math.trunc(number * numberDivider) / numberDivider;
  let v = num.toString().split(".");
  let f = v[1] || "";

  while (f.length < decimals) f += "0";

  return parseInt(decimals === 0 ? `${v[0]}` : `${v[0]}.${f}`);
};

export default trucateNumber;
