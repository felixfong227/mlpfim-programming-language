const fs = require("fs"),
    path = require("path"),
    stdin = process.openStdin(),
    terminal = require("child_process").exec;


module.exports = {

    running: false,

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


        if(!require("./interperter").running){

            // create variable (module)

            if(keyword.includes("let") && !keyword.includes("//")){
                require("./interperter").running = true;
                require("./buildfun/let").let(code,keyword);
                require("./interperter").running = false;
            }

            // basic output (module)

            else if(keyword.includes("dearPC") && !keyword.includes("//")){
                require("./interperter").running = true;
                require("./buildfun/dearPC").dearPC(code,keyword);
                require("./interperter").running = false;
            }

            // basic input (module)
            else if(keyword.includes("spike") && !keyword.includes("//")){
                require("./buildfun/spike").spike(code,line);
                require("./interperter").running = true;
            }

            // exit the program itself
            else if(keyword.includes("exit") && !keyword.includes("//")){
                process.exit();
            }

            // commenting
            else if(keyword.includes("//")){
                return true;
                require("./interperter").running = false;
                process.exit();
                require("./interperter").main(line++);
            }

            // if else (module)
            else if(keyword.includes("if") && !keyword.includes("//")){
                require("./buildfun/if").if(code,keyword,line);
            }

            // for loop(module)
            else if(keyword.includes("for") && !keyword.includes("//")){
                require("./buildfun/for").for(code,keyword);
            }

            // include other MLP source file (module)
            else if(keyword.includes("include") && !keyword.includes("//")){
                require("./buildfun/include").include(code,keyword,line);
            }

            // while loop (module)
            else if(keyword.includes("while") && !keyword.includes("//")){
                require("./buildfun/while").while(code,keyword);
            }

            // the file object(module)
            else if(keyword.includes("filesystem") && !keyword.includes("//")){
                require("./buildfun/filesystem").filesystem(code,keyword,line);
            }

            // skip code
            else if(keyword == "skip" && !keyword.includes("//")){
                require("./interperter").main( (line + 1) );
            }

            // the network object
            else if(keyword.includes("network") && !keyword.includes("//")){
                require("./buildfun/network").network(code,keyword,line);
            }

            // terminal command support
            else if(keyword.includes("system") && !keyword.includes("//")){
                require("./buildfun/system").system(code,keyword,line);
            }

            // convert string to JSON
            else if(keyword == "JSON" && !keyword.includes("//")){
                require("./buildfun/JSON").JSON(code,keyword,line);
            }

            // handling error


            else{

                if(javascriptFallBack === true){

                    // try to run using the JavaScript engine
                    try{
                        eval(code);
                    }catch (e){

                        console.log("I just don't know what when wrong on line => " + (line + 1));
                        console.log("On code => " + code);
                        process.exit();

                    }

                }else{
                    console.log("I just don't know what when wrong on line => " + (line + 1));
                    console.log("On code => " + code);
                    process.exit();
                }

            }


        }

    }

};

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