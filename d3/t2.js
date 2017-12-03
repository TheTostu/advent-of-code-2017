/*

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?

*/

// This is tricky, so I made a bit more abstraction than necessary...

// Map of arbitrary limits, filled with 0s;
var map = [];
map.x = 100;
map.y = 100;
for (var i = 0; i < map.x; i++) {
	map.push(new Array(map.y).fill(0));
}

// Pointer, useful tool to navigate and read the map :)
var pointer = {
	x: map.x/2, 
	y: map.y/2,
	move: function(dir) {
		switch(dir){
		case "l":
			this.x--;
			break;
		case "r":
			this.x++;
			break;
		case "u":
			this.y--;
			break;
		case "d":
			this.y++;
			break;
		default:
			break;
		}
	},
	read: function() {
		return map[this.x][this.y];
	},
	readAround: function() {
		return(
			map[this.x-1][this.y] + 
			map[this.x+1][this.y] + 
			map[this.x][this.y-1] + 
			map[this.x][this.y+1] + 
			map[this.x-1][this.y-1] + 
			map[this.x-1][this.y+1] + 
			map[this.x+1][this.y-1] + 
			map[this.x+1][this.y+1] 
		);
	},
	write: function(num) {
		map[this.x][this.y] = num
	},
	// This will become useful to signal change of direction
	isCorner: function() {
		// Count neighbours
		var neighbours = 0;
		if (map[this.x-1][this.y]) neighbours++;
		if (map[this.x+1][this.y]) neighbours++;
		if (map[this.x][this.y-1]) neighbours++;
		if (map[this.x][this.y+1]) neighbours++;
		if (map[this.x-1][this.y-1]) neighbours++;
		if (map[this.x-1][this.y+1]) neighbours++;
		if (map[this.x+1][this.y-1]) neighbours++;
		if (map[this.x+1][this.y+1]) neighbours++;

		return neighbours < 3;
	}
};

var dir = {
	current: "r",
	change: function() {
		// Simple state machine
		switch(this.current) {
			case "r":
				this.current = "u";
				break;
			case "u":
				this.current = "l";
				break;
			case "l":
				this.current = "d";
				break;
			case "d":
				this.current = "r";
				break;
			default:
				break;
		}
	}
}

function solution(ourNum) {
	// Now we can simulate building the snail
	pointer.write(1);

	// Simple algorithm: 1. Collect neighbours, write it and move along. If corner, change direction	
	// Do it until you find value bigger than our number input
	for (var i = 1; pointer.read() < ourNum; i ++) {
		pointer.move(dir.current);
		pointer.write(pointer.readAround());
		if (pointer.isCorner()) dir.change();
	}

	// We have found first valu ebigger than our number input
	return pointer.read();
}

var testCases = [
	[18565200,18565223]
];

var passed = 0;

console.log("TESTING:");

testCases.forEach(function(testCase) {
	var sol = solution(testCase[0]);

	if (testCase[1] === sol) {
		console.log("\x1b[32m  Case passed: %s => %s \x1b[0m", testCase[0], testCase[1]);
		passed++;
	} else {
		console.log("\x1b[31m  Case FAILED: %s => %s (expected %s) \x1b[0m", testCase[0], sol, testCase[1]);
	}
});

console.log("Tests passed: %s/%s", passed, testCases.length);