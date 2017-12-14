/*

You receive a signal directly from the CPU. Because of your recent assistance with jump instructions, it would like you to compute the result of a series of unusual register instructions.

Each instruction consists of several parts: the register to modify, whether to increase or decrease that register's value, the amount by which to increase or decrease it, and a condition. If the condition fails, skip the instruction without modifying the register. The registers all start at 0. The instructions look like this:

b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
These instructions would be processed as follows:

Because a starts at 0, it is not greater than 1, and so b is not modified.
a is increased by 1 (to 1) because b is less than 5 (it is 0).
c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
c is increased by -20 (to -10) because c is equal to 10.
After this process, the largest value in any register is 1.

You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU doesn't have the bandwidth to tell you what all the registers are named, and leaves that to you to determine.

What is the largest value in any register after completing the instructions in your puzzle input?

*/

var fs  = require("fs");
var input = fs.readFileSync("./input.txt").toString().split('\n');

var instructions = [];
var registers = {};

var comparisons = {
	"<": "lt",
	">": "gt",
	"<=": "let",
	">=": "get",
	"==": "eq",
	"!=": "neq"
};

input.forEach(function(line) {
	line = line.split(" ");
	if (!registers[line[0]]) registers[line[0]] = line[0]; // Collect registers
	if (line[1] == "dec") line[2] = -line[2];

	instructions.push({
		reg: line[0],
		add: parseInt(line[2]),
		if: {
			reg: line[4],
			compare: comparisons[line[5]],
			value: parseInt(line[6])
		}
	});
});

Object.keys(registers).forEach(function(key){
	registers[key] = 0;
});

instructions.forEach(function (instr) {
	var reg = instr["reg"];
	var comp = instr["if"];

	switch(comp["compare"]) {
		case "lt":
			if(registers[comp["reg"]] < comp["value"]) registers[reg] += instr["add"];
			break;
		case "gt":
			if(registers[comp["reg"]] > comp["value"]) registers[reg] += instr["add"];
			break;
		case "let":
			if(registers[comp["reg"]] <= comp["value"]) registers[reg] += instr["add"];
			break;
		case "get":
			if(registers[comp["reg"]] >= comp["value"]) registers[reg] += instr["add"];
			break;
		case "eq":
			if(registers[comp["reg"]] == comp["value"]) registers[reg] += instr["add"];
			break;
		case "neq":
			if(registers[comp["reg"]] != comp["value"]) registers[reg] += instr["add"];
			break;

	}
});

var values = [];

for (i in registers) {
	values.push(registers[i]);
}

console.log(values.sort(function(a,b){return a-b;}));