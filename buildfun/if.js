module.exports = {

    if: function (code,keyword,line) {

        var argument = code.split(keyword)[1].split("\n")[0].trim();

        if(eval(argument)){
            var trueCode = code.split("else")[0].split(argument)[1].split("\n");
            // run true code
            for(var i = 1; i < trueCode.length - 1; i++){
                trueCode[i] = trueCode[i].trim();
                require("../interperter").runCode(trueCode[i] + ";");
            }

        }else{

            try{

                // try to run the false code
                var falseCode = code.split("else")[1].split("\n");

                // run false code

                for(var i = 1; i < falseCode.length; i++){
                    falseCode[i] = falseCode[i].trim();
                    require("../interperter").runCode(falseCode[i] + ";");
                }

            }catch (e){

                // but if the main if return false but the user didn't tell false code
                require("../interperter").running = true;
                require("../interperter").main(line);
                require("../interperter").running = false;

            }



        }

    }

}