/*

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

*/

function solution(num) {
	// At first we need to find some patterns.
	// Our numbers create pretty regular shape - a square.
	// If we want to know minimal steps, we have to move, we need a "layer" or "lap" that our number will be on.
	// Each layer ends with a square of an odd number (1, 9, 25, 49), so we have to find the layer of our input number by comparing it to these odd numbers

	var layer = 1,
		odd = 1;

	while (num > Math.pow(odd, 2)) {
		odd += 2;
		layer ++;
	}

	// Now we can calculate minimum and maximum steps, that you have to do to get a number on layer "n", which is between n and 2n.

	var minSteps = layer;

	// Almost last thing will be finding 4 numbers, that will be the shortest way to get on the layer (f.e. for layer 3 -> 11, 15, 19, 23). It will be calculated with a clever algorithm shown below :)

	var lastOnLayer = Math.pow(odd, 2);

	var shortest = [
		lastOnLayer - 1 * layer + 1,
		lastOnLayer - 3 * layer + 3,
		lastOnLayer - 5 * layer + 5,
		lastOnLayer - 7 * layer + 7,
	];

	// THE LAST STEP - Calculate steps by finding closest "Shortest point" and adding the last steps :D

	var closest = shortest.map(function(short) {
		return [short, Math.abs(num - short)]; // Calculate difference
	}).sort(function(a, b) {
		return a[1] - b[1]; // Sort by difference
	});

	// We have our required steps!!!

	return layer + closest[0][1] - 1;
}

var testCases = [
	[1, 0],
	[9, 2],
	[10, 3],
	[12, 3],
	[1024, 31]
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