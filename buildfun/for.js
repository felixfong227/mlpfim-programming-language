module.exports = {

    for: function (code,keyword) {

        var index = code.split(keyword)[1].split("\n")[0].split(" ")[1];
        var startNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[2] );
        var endtNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[3] );
        var powerNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[4] );
        var todo = code.split(keyword)[1].split("\n");
        for(var i = 1; i < todo.length; i++){

            todo[i] = todo[i].trim();

            for(var index = startNumber; index < endtNumber; index+=powerNumber){
                require("../interperter").runCode(todo[i] + ";");
            }

        }

    }

}