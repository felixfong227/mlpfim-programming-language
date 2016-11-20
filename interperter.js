const fs = require("fs"),
    path = require("path"),
    stdin = process.openStdin(),
    terminal = require("child_process").exec;


module.exports = {

    main: function (l) {

        if(typeof l == "undefined"){

            // Default

            if(process.argv[3] == "--dev"){

                // listen for process end and report the run timmer
                var timmer = 0;
                setInterval(function () {
                    timmer += 100;
                },100);
                process.on("exit",function () {
                    console.log("");
                    console.log("=== Process End === ");
                    console.log(`The time you run this program: ${timmer}ms(${timmer / 1000}s)`);
                    process.exit();
                });

            }else if(process.argv[3] == "--js"){

                // checking is allow JavaScipt fallback

                if(typeof process.argv[4] !== "undefined"){

                    if(process.argv[4] == "true"){
                        javascriptFallBack = true;
                    }else if(process.argv[4] == "false"){
                        javascriptFallBack = false;
                    }

                }


            }




            for(var i = 0; i < code.length - 1; i++){
                require("./interperter").runCode(code[i].trim(),i);
            }

        }else{

            // Run line

            for(var i = l + 1; i < code.length - 1; i++){
                require("./interperter").runCode(code[i].trim(),i);
            }

        }

    },

    runCode: function (code,line) {

        var keyword = code.split(" ")[0];


        if(!running){

            // create variable (module)

            if(keyword.includes("let") && !keyword.includes("//")){
                running = true;
                require("./buildfun/let").let(code,keyword);
                running = false;
            }

            // basic output (module)

            else if(keyword.includes("dearPC") && !keyword.includes("//")){
                running = true;
                require("./buildfun/dearPC").dearPC(code,keyword);
                running = false;
            }

            // basic input
            else if(keyword.includes("spike") && !keyword.includes("//")){
                running = false;
                var inputName = code.split(" ")[1];

                process.stdin.once("data",function (data) {
                    data = data.trim();
                    data = '"' + data + '";';
                    eval(`${inputName} = ${data}`);
                    running = false;
                    require("./interperter").main(line);
                });

                running = true;

            }

            // exit the program itself
            else if(keyword.includes("exit") && !keyword.includes("//")){
                process.exit();
            }

            // commenting
            else if(keyword.includes("//")){
                return true;
                running = false;
                process.exit();
                require("./interperter").main(line++);
            }

            // if else
            else if(keyword.includes("if") && !keyword.includes("//")){
                var argument = code.split(keyword)[1].split("\n")[0].trim();

                if(eval(argument)){
                    var trueCode = code.split("else")[0].split(argument)[1].split("\n");
                    // run true code
                    for(var i = 1; i < trueCode.length - 1; i++){
                        trueCode[i] = trueCode[i].trim();
                        require("./interperter").runCode(trueCode[i] + ";");
                    }

                }else{

                    try{

                        // try to run the false code
                        var falseCode = code.split("else")[1].split("\n");

                        // run false code

                        for(var i = 1; i < falseCode.length; i++){
                            falseCode[i] = falseCode[i].trim();
                            require("./interperter").runCode(falseCode[i] + ";");
                        }

                    }catch (e){

                        // but if the main if return false but the user didn't tell false code
                        running = true;
                        require("./interperter").main(line);
                        running = false;

                    }



                }


            }

            // for loop

            else if(keyword.includes("for") && !keyword.includes("//")){

                var index = code.split(keyword)[1].split("\n")[0].split(" ")[1];
                var startNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[2] );
                var endtNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[3] );
                var powerNumber = parseInt( code.split(keyword)[1].split("\n")[0].split(" ")[4] );
                var todo = code.split(keyword)[1].split("\n");
                for(var i = 1; i < todo.length; i++){

                    todo[i] = todo[i].trim();

                    for(var index = startNumber; index < endtNumber; index+=powerNumber){
                        require("./interperter").runCode(todo[i] + ";");
                    }

                }


            }

            // include other MLP source file

            else if(keyword.includes("include") && !keyword.includes("//")){

                var sourcefilePath = path.join( __dirname + "/" + code.split(keyword)[1].trim() );

                try{

                    var newCode = fs.readFileSync(sourcefilePath).toString();
                    newCode = newCode.split(";");

                    for(var i = 0; i < newCode.length - 1; i++){
                        newCode[i] = newCode[i].trim();
                        require("./interperter").runCode(newCode[i]);
                    }
                    require("./interperter").main(line);

                }catch (e){

                    if(e.message.includes("no such file")){

                        console.log("Can't not find the file to be including => " + code.split(keyword)[1].trim());
                        process.exit();

                    }
                }

            }

            // while loop
            else if(keyword.includes("while") && !keyword.includes("//")){

                var argument = code.split(keyword)[1].split("\n")[0].trim();
                var todo = code.split("\n");

                while (argument){

                    for(var i = 1; i < todo.length; i++){

                        require("./interperter").runCode(todo[i].trim());

                    }

                }


            }

            // the file object

            else if(keyword.includes("filesystem") && !keyword.includes("//")){

                var call = code.split(".")[1].split(" ")[0];
                var fileObject = {

                    writeFile: function () {

                        var filePath = path.join(__dirname + "/" +  code.split(call)[1].trim().replace("\"","").replace("\"","").split("{")[0] );
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

                        var filePath = path.join(__dirname + "/" +  code.split(call)[1].split("\"")[1] );
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
                        var filePath = path.join(__dirname + "/" +  code.split(call)[1].split("\"")[1] );
                        fs.mkdirSync(filePath);
                    },

                    rmdir: function () {
                        var filePath = path.join(__dirname + "/" +  code.split(call)[1].split("\"")[1] );

                        try{
                            fs.rmdirSync(filePath);
                        }catch (e){
                            console.log("Error: The directory is not empty [You can try filesystem.rmdirandfiles]");
                            process.exit();
                        }

                    },

                    rmdirandfiles: function () {
                        var filePath = path.join(__dirname + "/" +  code.split(call)[1].split("\"")[1] );
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

            // skip code

            else if(keyword == "skip" && !keyword.includes("//")){

                require("./interperter").main( (line + 1) );

            }

            // handling error


            else{

                if(javascriptFallBack === true){

                    // try to run using the JavaScript engine
                    try{
                        eval(code);
                    }catch (e){

                        console.log("I just don't know what when wrong on line => " + (line + 1));
                        process.exit();

                    }

                }else{
                    console.log("I just don't know what when wrong on line => " + (line + 1));
                    process.exit();
                }

            }

        }

    }

};

var running = false;
process.stdin.resume();
process.stdin.setEncoding('utf8');
// looping up for source files

var sourcefile = process.argv[2];
var javascriptFallBack = true;


if( process.argv[2].includes(".mlp") || process.argv[2].includes(".mlpfim")){

    // MLP source file
    var code = fs.readFileSync(__dirname + "/" + sourcefile).toString() + "\nexit;";
    code = code.split(";");

    require("./interperter").main();

}else{
    console.log("The interpreter won't run a source file without .mlp or .mlpfim extension");
    process.exit();
}

