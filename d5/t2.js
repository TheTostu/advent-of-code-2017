/*

Now, the jumps are even stranger: after each jump, if the offset was three or more, instead decrease it by 1. Otherwise, increase it by 1 as before.

Using this rule with the above example, the process now takes 10 steps, and the offset values after finding the exit are left as 2 3 2 3 -1.

How many steps does it now take to reach the exit?

*/

function solution(str) {
	var pointer = {
		index: 0,
		jump: function(arr) {
			var oldIndex = this.index;
			this.index += arr[this.index];
			if (arr[oldIndex] >= 3) {
				arr[oldIndex] --;
			} else {
				arr[oldIndex] ++;
			}

			return this.index;
		}
	}

	var instructions = str.split(" ").map(function(w) {
		return parseInt(w);
	});

	var jumps = 0;

	while(pointer.jump(instructions) <= instructions.length) {
		jumps ++;
	}

	return jumps;
}

var testCases = [
	["0 3 0 1 -3", 5],
	["3 0 0 1", 2]
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