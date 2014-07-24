var PI = Math.PI;

exports.x = Math.random();

exports.area = function (r) {
  return PI * r * r;
};

exports.circumference = function (r) {
  return 2 * PI * r;
};