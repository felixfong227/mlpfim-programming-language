module.exports = {

    while: function (code,keyword) {

        var argument = code.split(keyword)[1].split("\n")[0].trim();
        var todo = code.split("\n");

        while (argument){

            for(var i = 1; i < todo.length; i++){

                require("../interperter").runCode(todo[i].trim());

            }

        }

    }

}