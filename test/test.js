var boole_data = require("../js/data-logic.js");
var parsers = require("../js/parsers.js");
ExprPrefixParser = parsers.ExprPrefixParser;
ExprVHDLParser = parsers.ExprVHDLParser
ExprGenericParser = parsers.ExprGenericParser;

var assert = require('assert');
describe('Generating prefix notation', function() {
  describe('#parseFormulaToPrefixNotation()', function() {
    it('should generate correct objects describing a circuit in prefix notation', function() {
      var ins = ["a","b","c","d","e","f"];
      var out = ["g"];
      var expressions = 
      [
	"(~a·~d) ∨ (c·d) ∨ (~a·b) ∨ (a·~c)",
        "(~a) ∨ (~b) ∨ (d)",
        "(~a·~d) ∨ (~b·~d) ∨ (b·~c·d) ∨ (a·c·d)",
        "(~a·~b·~c) ∨ (~d) ∨ (b·c) ∨ (a·c) ∨ (a·b)",
        "(b) ∨ (~a·~d) ∨ (c·d) ∨ (a·~c)"
      ];
      var solutions = 
      [
        [ '|',  [ '&', [ '~', 'a' ], [ '~', 'd' ] ],[ '&', 'c', 'd' ], [ '&', [ '~', 'a' ], 'b' ], [ '&', 'a', [ '~', 'c' ] ] ],
        [ '|', [ '~', 'a' ], [ '~', 'b' ], 'd' ],
        [ '|', [ '&', [ '~', 'a' ], [ '~', 'd' ] ],  [ '&', [ '~', 'b' ], [ '~', 'd' ] ],  [ '&', 'b', [ '~', 'c' ], 'd' ],  [ '&', 'a', 'c', 'd' ] ],
        [ '|', [ '&', [ '~', 'a' ], [ '~', 'b' ], [ '~', 'c' ] ],  [ '~', 'd' ],  [ '&', 'b', 'c' ],  [ '&', 'a', 'c' ],  [ '&', 'a', 'b' ] ],        
        [ '|',  'b',  [ '&', [ '~', 'a' ], [ '~', 'd' ] ],  [ '&', 'c', 'd' ],  [ '&', 'a', [ '~', 'c' ] ] ],        
      ]

      assert.equal(expressions.length, solutions.length);

      for(var i = 0; i<expressions.length; i++){
          var ret = boole_data._test.parseFormulaToPrefixNotation(expressions[i], ins, out);
          //console.log(ret)
          assert.equal(JSON.stringify(ret), JSON.stringify(solutions[i]));
      }

    });
  });
});

describe('Generating VHDL', function() {
  describe('#parseFormulaToVHDLNotation()', function() {
    it('should generate correct VHDL expressions from a boolean formula', function() {
      var ins = ["a","b","c","d","e","f"];
      var out = ["g"];
      var expressions =
      [
        "(~c) ∨ (~a·d) ∨ (~a·b) ∨ (a·~b·~d) ∨ (b·d)",
        "(~a·~d) ∨ (a·~b·~c·d) ∨ (c·~d) ∨ (b·~d) ∨ (a·b·c)",
        "(~c) ∨ (d) ∨ (a·b)",
        "(~a·~b·~d) ∨ (b·d) ∨ (a·~c) ∨ (~b·~c)",
        "(d) ∨ (~a·c) ∨ (b)"
      ];
      var solutions =
      [
        "( not ( c ) ) or ( not ( a ) and d ) or ( not ( a ) and b ) or ( a and not ( b ) and not ( d ) ) or ( b and d )",
        "( not ( a ) and not ( d ) ) or ( a and not ( b ) and not ( c ) and d ) or ( c and not ( d ) ) or ( b and not ( d ) ) or ( a and b and c )",
        "( not ( c ) ) or ( d ) or ( a and b )",
        "( not ( a ) and not ( b ) and not ( d ) ) or ( b and d ) or ( a and not ( c ) ) or ( not ( b ) and not ( c ) )",
        "( d ) or ( not ( a ) and c ) or ( b )"
      ]

      assert.equal(expressions.length, solutions.length);

      for(var i = 0; i<expressions.length; i++){
          var ret = boole_data._test.parseFormulaToVHDLNotations(expressions[i], ins, out);
          //console.log(ret)
          assert.equal(JSON.stringify(ret), JSON.stringify(solutions[i]));
      }

    });
  });
});

