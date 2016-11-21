var terminal = require("child_process").exec;
module.exports = {
    network: function (code,keyword,line) {
        var call = code.split(".")[1].split(" ")[0];
        var networkObject = {

            get: function () {

                var url = code.split("\"")[1].trim();
                var callbackVariable = code.split("\"")[2].trim();

                terminal(`curl -s ${url}`,function (error,data) {

                    require("../interperter").running = false;

                    try{
                        eval(`${callbackVariable} = '${data}'`);
                    }catch (e){
                        eval(`${callbackVariable} = "${data}"`);
                    }
                    require("../interperter").main(line);
                });

                require("../interperter").running = true;

            },

            JSON: function () {

                var url = code.split("\"")[1].trim();
                var callbackVariable = code.split("\"")[2].trim();

                terminal(`curl -s ${url}`,function (error,data) {

                    require("../interperter").running = false;
                    try{
                        eval(`${callbackVariable} = ${data}`);
                    }catch (e){
                        eval(`${callbackVariable} = ${data}`);
                    }
                    require("../interperter").main(line);
                });

                require("../interperter").running = true;

            }

        }


        try{
            eval("networkObject." + call + "();");
        }catch (e){
            e = e.message;

            if(e.includes("is not a function")){
                console.log("Can't not find the correct network object you are looking for");
                console.log("On code: " + code);
                process.exit();
            }

        }

    }
};