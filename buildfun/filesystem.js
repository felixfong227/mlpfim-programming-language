var path = require("path"),
    fs = require("fs"),
    terminal = require("child_process").exec
module.exports = {

    filesystem: function (code,keyword,line) {

        var call = code.split(".")[1].split(" ")[0];
        var fileObject = {

            writeFile: function () {
                var filePath = path.join(process.cwd() + "/../" +  code.split(call)[1].trim().replace("\"","").replace("\"","").split("{")[0] );
                var text = code.split("{")[1].split("}")[0].trim();
                var bigText = [];
                text = text.split("\n");
                text.forEach(function (chunk) {
                    bigText.push( chunk.trim() );
                });

                bigText.forEach(function (chunk) {
                    bigText = bigText.toString();
                    bigText = bigText.replace(",","\n");
                });

                fs.writeFileSync(filePath,bigText);

            },

            readFile: function () {

                var filePath = path.join(process.cwd() + "/../" +  code.split(call)[1].split("\"")[1] );
                var textVariable = code.split(keyword)[1].split("\"")[2].trim();
                var data = fs.readFileSync(filePath).toString().trim();
                var bigData = [];

                data = data.split("\n");
                data.forEach(function (chunk) {
                    bigData.push( chunk.trim() );
                });

                bigData.forEach(function (chunk) {
                    bigData = bigData.toString();
                    bigData = bigData.replace(",","__mlpInterperterOutput_newLine__");
                });

                eval(`${textVariable} = "${bigData}"`);
            },

            mkdir: function () {
                var filePath = path.join(process.cwd() + "/../" +  code.split(call)[1].split("\"")[1] );
                fs.mkdirSync(filePath);
            },

            rmdir: function () {
                var filePath = path.join(process.cwd() + "/../" +  code.split(call)[1].split("\"")[1] );

                try{
                    fs.rmdirSync(filePath);
                }catch (e){
                    console.log("Error: The directory is not empty [You can try filesystem.rmdirandfiles]");
                    process.exit();
                }

            },

            rmdirandfiles: function () {
                var filePath = path.join(process.cwd() + "/../" +  code.split(call)[1].split("\"")[1] );
                terminal(`rm -rfv ${filePath}`);
            }

        }

        try{
            eval("fileObject." + call + "();");
        }catch (e){
            e = e.message;

            if(e.includes("is not a function")){
                console.log("Can't not find the correct filesystem object you are looking for");
                console.log("On code: " + code);
                process.exit();
            }

        }

    }

}