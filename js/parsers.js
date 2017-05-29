function ExprGenericParser(concreteParser) {
    var setParser = concreteParser;
    
    this.nextRecursionLevel = function(expr, ins, out){
        var ret = [];
        //Some preprocessing
        //First get rid of spaces and adapt symbols:
        expr = expr.replace(/\u2228/g, "|");//Logical disjunction
        expr = expr.replace(/\u00B7/g, "&");//Logical conjunction
        expr = expr.replace(/ /g, "" );     //Spaces    

        //console.log("Sanitized expression: " + expr);

        //First build a regex that will accept input names only
        var inputRegexStr = "^(";
        for(var i = 0; i<ins.length; i++) {
            inputRegexStr += ins[i]
            if(i < ins.length-1){
                inputRegexStr+="|";
            }
        }    
        inputRegexStr += ")$";
        var inputRegex = new RegExp(inputRegexStr);
        //console.log("var name regex: " + inputRegex);

        //Then work out how many parentheses are in each token if the expression is split in "|" and "&"
        var tokensAnd = expr.split("&"); var numParenthesesAnd = 0; var couldBeAndExpr = true;
        var tokensOr = expr.split("|"); var numParenthesesOr = 0; var couldBeOrExpr = true;

        //console.log("Checking for and");
        if(tokensAnd.length <= 1) couldBeAndExpr = false;
        for (var i = 0; i<tokensAnd.length; i++) {
            var token = tokensAnd[i];
            //console.log("token " + token + "has " + (token.match(/[(]/g) || []).length + "(s");
            //console.log("token " + token + "has " + (token.match(/[)]/g) || []).length + ")s");
            if( (token.match(/[(]/g) || []).length != (token.match(/[)]/g) || []).length ) {
                couldBeAndExpr = false;
                break;
            }
        }

        if(tokensOr.length <= 1) couldBeOrExpr = false;
        for (var i = 0; i<tokensOr.length; i++) {
            var token = tokensOr[i];
            if( (token.match(/[(]/g) || []).length != (token.match(/[)]/g) || []).length ) {
                couldBeOrExpr = false;
                break;
            }
        }

        //Finally check if there is only one "(" and one ")"
        var isParenExpr = false;
        if((expr.match(/[(]/g) || []).length == 1 && (expr.match(/[)]/g) || []).length == 1) {
            isParenExpr = true;
        }

        var isNotExpr = (expr.charAt(0) == "~");
        var isOneExpr = (expr.charAt(0) == "1");
        var isZeroExpr = (expr.charAt(0) == "0");
        var isLiteralExpr = (inputRegex.test(expr));

        if(isParenExpr) {
            //console.log("expr -> expr & expr");
            return setParser.parseParenExpr(expr, ins, out);
        }
        else if(couldBeAndExpr) {
            return setParser.parseAndExpr(expr, ins, out);
        }
        else if(couldBeOrExpr) {
            return setParser.parseOrExpr(expr, ins, out);
        }
        else if(isNotExpr) {
            return setParser.parseNotExpr(expr, ins, out);
        }
        else if(isZeroExpr) {
            return setParser.parseLiteralZeroExpr(expr, ins, out);
        }
        else if(isLiteralExpr) {
            return setParser.parseLiteralExpr(expr, ins, out);
        }
        else if(isOneExpr) {
            return setParser.parseLiteralOneExpr(expr,ins,out);
        }

    }
}

function ExprPrefixParser(){
    var superParser;

    this.init = function (fatherParser){
        this.superParser = fatherParser;
    }

    this.parseParenExpr = function(expr, ins, out) {
        return this.superParser.nextRecursionLevel(expr.substring(1, expr.length-1), ins, out)
    }
    this.parseAndExpr = function(expr, ins, out) {
        var ret = [];
        var tokens = expr.split("&");
        ret[0] = "&";
        for(var i = 0; i<tokens.length; i++){
            ret[i+1] = this.superParser.nextRecursionLevel(tokens[i], ins, out);
        }
        return ret;
    }
    this.parseOrExpr = function (expr, ins, out) {
        var ret = [];
        var tokens = expr.split("|");
        ret[0] = "|";
        for(var i = 0; i<tokens.length; i++){
            ret[i+1] = this.superParser.nextRecursionLevel(tokens[i], ins, out);
        }
        return ret;
    }
    this.parseNotExpr = function (expr, ins, out) {
        var ret = [];
        ret = ["~", this.superParser.nextRecursionLevel(expr.substring(1), ins, out)];
        return ret;
    }
    this.parseLiteralExpr = function (expr, ins, out) {
        var ret = [];
        ret = expr;
        return ret;
    }
    this.parseLiteralZeroExpr = function (expr, ins, out) {
        var ret = [];
        ret = "0";
        return ret;
    }
    this.parseLiteralOneExpr = function (expr, ins, out) {
        var ret = [];
        ret = "1";
        return ret;
    }

}

function ExprVHDLParser(){
    var superParser;

    this.init = function (fatherParser){
        this.superParser = fatherParser;
    }

    this.parseParenExpr = function(expr, ins, out) {
        var ret = "";
        ret += "( ";
        ret += this.superParser.nextRecursionLevel(expr.substring(1, expr.length-1), ins, out);
        ret += " )";
        return ret;
    }
    this.parseAndExpr = function(expr, ins, out) {
        var ret = "";
        var tokens = expr.split("&");
        for(var i = 0; i<tokens.length; i++){
            ret+= this.superParser.nextRecursionLevel(tokens[i], ins, out);
            if( i < tokens.length-1) {
                ret+=" and ";
            }
        }
        return ret;
    }
    this.parseOrExpr = function (expr, ins, out) {
        var ret = "";
        var tokens = expr.split("|");
        for(var i = 0; i<tokens.length; i++){
            ret+= this.superParser.nextRecursionLevel(tokens[i], ins, out);
            if( i < tokens.length-1) {
                ret+=" or ";
            }
        }
        return ret;
    }
    this.parseNotExpr = function (expr, ins, out) {
        var ret = "";
        ret = "not ( " + this.superParser.nextRecursionLevel(expr.substring(1), ins, out) + " )";
        return ret;
    }
    this.parseLiteralExpr = function (expr, ins, out) {
        var ret = "";
        ret = expr;
        return ret;
    }
    this.parseLiteralZeroExpr = function (expr, ins, out) {
        var ret = "";
        ret = "0";
        return ret;
    }
    this.parseLiteralOneExpr = function (expr, ins, out) {
        var ret = "";
        ret = "1";
        return ret;
    }

}

exports.ExprGenericParser = ExprGenericParser;
exports.ExprPrefixParser = ExprPrefixParser;
exports.ExprVHDLParser = ExprVHDLParser;
