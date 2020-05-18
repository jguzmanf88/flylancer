const hbs = require('hbs');

hbs.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
});
  
hbs.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
});

hbs.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});