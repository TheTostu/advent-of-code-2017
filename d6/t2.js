/*

Out of curiosity, the debugger would also like to know the size of the loop: starting from a state that has already been seen, how many block redistribution cycles must be performed before that same state is seen again?

In the example above, 2 4 1 2 is seen again after four cycles, and so the answer in that example would be 4.

How many cycles are in the infinite loop that arises from the configuration in your puzzle input?

*/

function solution(str) {
	var banks = str.split(" ").map(function(num) {
		return parseInt(num);
	});

	var combinations = [];


	var inserter = {
		index: 0,
		value: 0
	};

	var last;

	while(combinations.indexOf(banks.toString()) < 0) {	
		combinations.push(banks.toString());


		// Find biggest value
		banks.forEach(function(num, index) {
			if (num > inserter.value) {
				inserter.index = index;
				inserter.value = num;
			}
		});

		// Redistribute value
		banks[inserter.index] = 0;
		while(inserter.value) {
			inserter.index = (inserter.index + 1) % banks.length;
			banks[inserter.index]++;
			inserter.value--;
		}

		last = banks.toString();

	}

	console.log(combinations.length);


	return combinations.length - combinations.indexOf(last);;
}

var testCases = [
	["0 2 7 0", 4],
	["0 1 0 0", 4],
	["14 0 15 12 11 11 3 5 1 6 8 4 9 1 8 4", 1037]
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