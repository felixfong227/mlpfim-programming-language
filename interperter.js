const fs = require("fs"),
    path = require("path"),
    stdin = process.openStdin()

var running = false;
process.stdin.resume();
process.stdin.setEncoding('utf8');
// looping up for source files

var sourcefile = process.argv[2];

if( process.argv[2].includes(".mlp") || process.argv[2].includes(".mlpfim")){

    // MLP source file
    try{
        var code = fs.readFileSync(__dirname + "/" + sourcefile).toString() + "\nexit;";
        code = code.split(";");

        main();
    }catch (e){
        console.log("Can't not find the source file.");
        process.exit();
    }

}else{
    console.log("The interpreter won't run a source file without .mlp or .mlpfim extension");
    process.exit();
}

function main(l) {
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

        }

        for(var i = 0; i < code.length - 1; i++){
            runCode(code[i].trim(),i);
        }

    }else{

        // Run line

        for(var i = l + 1; i < code.length - 1; i++){
            runCode(code[i].trim(),i);
        }

    }


}


function runCode(code,line) {

    var keyword = code.split(" ")[0];


    if(!running){

        // create variable

        if(keyword.includes("let") && !keyword.includes("//")){
            running = true;
            var varName = code.split(keyword)[1].split(" ")[1].trim();
            var varValue = code.split(keyword)[1].split("\"")[1];
            eval(`${varName} = "${varValue}";`);
            running = false;
        }

        // basic output

        else if(keyword.includes("dearPC") && !keyword.includes("//")){
            running = true;
            var word = code.split("\"")[1];

            // template strings
            while (word.includes("{") && word.includes("}")) {

                var tmpString = word.substring(word.lastIndexOf("{") + 1, word.lastIndexOf("}"));

                word = word.replace(tmpString, eval(tmpString)).replace("{", "").replace("}", "");

            }

            console.log(word);
            running = false;
        }

        // basic input
        else if(keyword.includes("spike") && !keyword.includes("//")){
            var inputName = code.split(" ")[1];
            stdin.once("data",function (data) {
                data = data.trim();
                data = '"' + data + '";';
                eval(`${inputName} = ${data}`);
                running = false;
                main(line);
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
            main(line++);
        }

        // if else
        else if(keyword.includes("if") && !keyword.includes("//")){
            var argument = code.split(keyword)[1].split("\n")[0].trim();

            if(eval(argument)){
                var trueCode = code.split("else")[0].split(argument)[1].split("\n");
                // run true code
                for(var i = 1; i < trueCode.length - 1; i++){
                    trueCode[i] = trueCode[i].trim();
                    runCode(trueCode[i] + ";");
                }

            }else{

                try{

                    // try to run the false code
                    var falseCode = code.split("else")[1].split("\n");

                    // run false code

                    for(var i = 1; i < falseCode.length; i++){
                        falseCode[i] = falseCode[i].trim();
                        runCode(falseCode[i] + ";");
                    }

                }catch (e){

                    // but if the main if return false but the user didn't tell false code
                    running = true;
                    main(line);
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
                    runCode(todo[i] + ";");
                }

            }


        }

        // include other MLP source file

        else if(keyword.includes("include") && !keyword.includes("//")){

            var sourcefilePath = path.join( __dirname + "/" + code.split(keyword)[1].trim() );

            var newCode = fs.readFileSync(sourcefilePath).toString();
            newCode = newCode.split(";");

            for(var i = 0; i < newCode.length - 1; i++){
                newCode[i] = newCode[i].trim();
                runCode(newCode[i]);
            }
            main(line);

        }

        // handling error

        else{
            console.log("I just don't know what when wrong: " + code);
            process.exit();
        }


    }

}
