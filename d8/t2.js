/*

To be safe, the CPU also needs to know the highest value held in any register during this process so that it can decide how much memory to allocate to these operations. For example, in the above instructions, the highest value ever held was 10 (in register c after the third instruction was evaluated).

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

var max = 0;

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

  max = max > registers[reg] ? max : registers[reg];
});

var values = [];

for (i in registers) {
  values.push(registers[i]);
}

console.log(values.sort(function(a,b){return a-b;}));

console.log(max);