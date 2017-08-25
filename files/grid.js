var Grid = function () {

	var self = {};
	var gridTable = [];
	
	for (i=0;i < 9; i++) {
		gridTable[i] = null;
	};
	
	self.resetGrid = function() {
		for (i=0;i < 9; i++) {
			gridTable[i] = null;
			$(".gridding").find(".ring").css("display","none");
			$(".gridding").find(".cross").css("display","none");
		};
	}
	
	self.isPositionAvaiable = function (position) {
		return (gridTable[position] == null);
	};
	
	self.getSymbol = function (position) {
		return gridTable[position];
	};
	
	self.setPosition = function(position,symbol) {
		if (self.isPositionAvaiable(position)) {
			gridTable[position] = symbol;
		};
	};
	

	self.showGrid = function () {
		var tab = ["-", "-", "-",
                "-", "-", "-",
                "-", "-", "-",];
		
		for (i=0; i < tab.length; i++) {
			if (self.getSymbol(i) == "CROSS") {
				tab[i] = "X";
			} else if (self.getSymbol(i) == "RING") {
				tab[i] = "0";
			};
		}
		
		console.log(tab[0] + " " + tab[1] + " " + tab[2]);
		console.log(tab[3] + " " + tab[4] + " " + tab[5]);
		console.log(tab[6] + " " + tab[7] + " " + tab[8]);
	};

return self;
};