Number.isInteger = Number.isInteger || function (num) {
  return typeof num === 'number' && Math.round(num) === num;
}

export {};