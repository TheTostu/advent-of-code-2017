/*

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?

*/

function solution(str) { // Enter strings line by line
	str = str.split("\t").sort(function(a,b){return a-b;});
	
	return str.pop() - str.shift();
}

var testCases = [
	["5	1	9	5", 8],
	["7	5	3", 4],
	["2	4	6	18", 16]
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