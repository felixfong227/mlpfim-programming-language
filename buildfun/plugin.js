var path = require("path"),
    fs = require("fs")
module.exports = {

    plugin: function (code,keyword,line) {
        var name = code.split(keyword)[1].split(".")[0].trim();
        var calling = code.split(keyword)[1].split(".")[1].split("(")[0].trim();
        var pluginPath = path.join("../plugin/" + name);

        try{

            // with args
            var args = code.split(keyword)[1].split(".")[1].split("(")[1].split(")")[0];

            try{
                eval(`require("${pluginPath}").${calling}(${args})`);
            }catch (e){
                if(e.message.includes()){
                    require("../interperter").echoError("Cannot find module",line);
                }
            }


        }catch (e){

            try{
                eval(`require("${pluginPath}").${calling}()`);
            }catch (e){
                if(e.message.includes("Cannot find module")){
                    require("../interperter").echoError("Cannot find module: " + name, line);
                }
                process.exit();
            }

        }
    }

}