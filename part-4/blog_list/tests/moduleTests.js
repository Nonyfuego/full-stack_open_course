const _ = require('lodash');

// console.log(_.isEmpty([]));

const obj = {
  name: 'nony',
  age: 24,
  height: '187cm',
};

console.log(_.at(obj, ['name', 'age']));
