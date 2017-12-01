/*

You notice a progress bar that jumps to 50% completion. Apparently, the door isn't yet satisfied, but it did emit a star as encouragement. The instructions change:

Now, instead of considering the next digit, it wants you to consider the digit halfway around the circular list. That is, if your list contains 10 items, only include a digit in your sum if the digit 10/2 = 5 steps forward matches it. Fortunately, your list has an even number of elements.

For example:

1212 produces 6: the list contains 4 items, and all four digits match the digit 2 items ahead.
1221 produces 0, because every comparison is between a 1 and a 2.
123425 produces 4, because both 2s match each other, but no other digit has a match.
123123 produces 12.
12131415 produces 4.
What is the solution to your new captcha?

*/

function solution(str) {
	var ret = 0;
	var half = str.length/2; // We assume that string will have even length

	for (var i = 0, max = half; i < max; i++) {
		if (str[i] == str[i+half]) {
			ret += parseInt(str[i] * 2);
		}
	}

	return ret;
}

var testCases = [
	["1212", 6],
	["1221", 0],
	["123425", 4],
	["123123", 12],
	["12131415", 4]
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