var terminal = require("child_process").exec,
    https = require("https"),
    http = require("http")
module.exports = {
    network: function (code,keyword,line) {
        var call = code.split(".")[1].split(" ")[0];
        var networkObject = {

            get: function () {

                var url = code.split("\"")[1].trim();
                var callbackVariable = code.split("\"")[2].trim();

                if(url.includes(("https"))){
                    // https call
                    https.get(url,function (res) {

                        res.on("data",function (chunk) {
                            chunk = chunk.toString();
                            require("../interperter").running = false;
                            try{
                                eval(`${callbackVariable} = '${chunk}'`);
                            }catch (e){
                                eval(`${callbackVariable} = "${chunk}"`);
                            }
                            require("../interperter").main(line);
                        });

                    });
                }else if(url.includes("http")){

                    // https call
                    http.get(url,function (res) {

                        res.on("data",function (chunk) {
                            chunk = chunk.toString();
                            require("../interperter").running = false;
                            try{
                                eval(`${callbackVariable} = '${chunk}'`);
                            }catch (e){
                                eval(`${callbackVariable} = "${chunk}"`);
                            }
                            require("../interperter").main(line);
                        });

                    });

                }else{
                    console.log("Please specify where is a http or a https call");
                    console.on("On code => " + code);
                    console.log("On line => " + (line + 1));
                }

                require("../interperter").running = true;

            },

            JSON: function () {

                var url = code.split("\"")[1].trim();
                var callbackVariable = code.split("\"")[2].trim();

                if(url.includes(("https"))){
                    // https call
                    https.get(url,function (res) {

                        res.on("data",function (chunk) {
                            chunk = chunk.toString();
                            require("../interperter").running = false;
                            try{
                                eval(`${callbackVariable} = ${chunk}`);
                            }catch (e){
                                eval(`${callbackVariable} = ${chunk}`);
                            }
                            require("../interperter").main(line);
                        });

                    });
                }else if(url.includes("http")){

                    // https call
                    http.get(url,function (res) {

                        res.on("data",function (chunk) {
                            chunk = chunk.toString();
                            require("../interperter").running = false;
                            try{
                                eval(`${callbackVariable} = '${chunk}'`);
                            }catch (e){
                                eval(`${callbackVariable} = "${chunk}"`);
                            }
                            require("../interperter").main(line);
                        });

                    });

                }else{
                    console.log("Please specify where is a http or a https call");
                    console.on("On code => " + code);
                    console.log("On line => " + (line + 1));
                    process.exit();
                }

                require("../interperter").running = true;

            },

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