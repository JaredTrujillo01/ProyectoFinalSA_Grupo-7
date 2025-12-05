const isPositiveNumber = (v) => !isNaN(parseFloat(v)) && parseFloat(v) >= 0;
module.exports = { isPositiveNumber };
