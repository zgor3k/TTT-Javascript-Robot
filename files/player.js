var Player = function (name,symbol) {

  var self = {};

  var name;
  var symbol;
  var points = 0;
  
  this.name = name;
  this.symbol = symbol;
  
  self.setPoints = function (setPoints) {
	points = setPoints;
  };

  self.getSymbol = function () {
    return symbol.name;
  };
  
  self.getName = function () {
    return name;
  };
  
  self.getPoints = function () {
    return points;
  };

  return self;
};