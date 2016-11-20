var path = require("path"),
    fs = require("fs")
module.exports = {

    include: function (code,keyword,line) {
        var sourcefilePath = path.join( __dirname + "/../" + code.split(keyword)[1].trim() );

        try{

            var newCode = fs.readFileSync(sourcefilePath).toString();
            newCode = newCode.split(";");

            for(var i = 0; i < newCode.length - 1; i++){
                newCode[i] = newCode[i].trim();
                require("../interperter").runCode(newCode[i]);
            }
            require("../interperter").main(line);

        }catch (e){

            if(e.message.includes("no such file")){

                console.log("Can't not find the file to be including => " + code.split(keyword)[1].trim());
                process.exit();

            }
        }
    }

}