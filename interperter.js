#!/usr/bin/env node
var fs = require("fs"),
    path = require("path"),
    stdin = process.openStdin(),
    terminal = require("child_process").exec
;


module.exports = {

    running: false,

    main: function (l) {

        try{

            var config = fs.readFileSync(process.cwd() + "/mlpfimconfig.json").toString();
            config = JSON.parse(config);


            if(config.dev === true){

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

            }

            if(typeof l == "undefined"){

                // Default

                for(var i = 0; i < code.length - 1; i++){
                    require("./interperter").runCode(code[i].trim(),i);
                }

            }else{

                // Run line

                for(var i = l + 1; i < code.length - 1; i++){
                    require("./interperter").runCode(code[i].trim(),i);
                }

            }

        }catch (e){

            if(e.message.includes("no such file")){
                fs.writeFileSync(process.cwd() + "/mlpfimconfig.json","{\n  \"dev\": false\n}");
                require("./interperter").main();
            }

        }

    },

    runCode: function (code,line) {

        var keyword = code.split(" ")[0];

        if(typeof quiteWhenError == "undefined"){
            quiteWhenError = true;
        }else{
            quiteWhenError = quiteWhenError;
        }

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

            // plugin
            else if(keyword.includes("plugin") && !keyword.includes("//")){

                if(plugin === false){
                    console.log("Plugin is disabled");
                    process.exit();
                }else{
                    require("./buildfun/plugin").plugin(code,keyword,line);
                }

            }

            // handling error
            else{
                require("./interperter").echoError("I just don't know what when wrong?",line)
            }


        }

    },

    echoError: function (message,line) {
        line = (line + 1);
        console.log("== ERROR ==");
        console.log(message);
        if(!line <= 0){
            console.log("Error line:" + line);
        }
        console.log("====");
        process.exit();
    }

};

process.stdin.resume();
process.stdin.setEncoding('utf8');
// looping up for source files

var sourcefile = process.argv[2];

// MLP Shell
if(typeof process.argv[2] == "undefined"){

    console.log("== MLP Shell ==");
    console.log("== .exit to quite ==");

    process.stdin.on("data",function(chunk) {

        var code = chunk.toString().trim();

        if(code == ".exit"){
            process.exit();
        }

        require("./interperter").runCode(code, -1, false);

    });

    return false;

}

if( process.argv[2].includes(".mlp") || process.argv[2].includes(".mlpfim")){

    // MLP source file
    try{

        var code = fs.readFileSync(process.cwd() + "/" + sourcefile).toString() + "\nexit;";

        // Remove all the comment
        code = code
            .split(/`.*`/g).join("//SYSTEM_COMMENT;")
        ;
        code = code.split(";");

        require("./interperter").main();

    }catch (e){

        if(e.message.includes("no such file")){
            require("./interperter").echoError("Can't not find the correct source file", line);
        }

    }

}else{
    console.log("The interpreter won't run a source file without .mlp or .mlpfim extension");
    process.exit();
}