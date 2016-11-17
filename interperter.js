const fs = require("fs"),
    path = require("path")

var running = false;

process.stdin.setEncoding('utf8');
var sourcefiles = fs.readdirSync(__dirname);

// looping up for source files

for(sourcefile in sourcefiles){
    sourcefile = sourcefiles[sourcefile].trim();

    if( path.extname(sourcefile).includes(".mlp") || path.extname(sourcefile).includes(".mlpfim")){

        // MLP source file
        var code = fs.readFileSync(__dirname + "/" + sourcefile).toString();
        // console.log(code);
        code = code.split(";");

        main();

    }
}

function main(l) {

    if(typeof l == "undefined"){

        // Default

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
            process.stdin.on("data",function (data) {
                data = data.trim();
                data = '"' + data + '";';
                eval(`${inputName} = ${data}`);
                running = false;
                main(line);
                process.exit();
            });
            running = true;

        }

        // handling error

        else{
            console.log("I just don't know what when wrong: " + code);
            process.exit();
        }


    }



}