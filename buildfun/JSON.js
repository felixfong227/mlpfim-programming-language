module.exports = {

    JSON: function (code,keyword,line) {

        var variable = code.split(keyword)[1].trim();
        var data = eval(variable);
        eval(`${variable} = ${data}`);
    }

}