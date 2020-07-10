var i = 0;

var myfunc03 = function(i) {
console.log('HHJ')};

var myFunc01 = function() {
  myfunc03(i);
  i += 1;
  setTimeout(function() {
    if (i < 10) {
      myFunc01();
    }
  }, 1000);
}

myFunc01();
