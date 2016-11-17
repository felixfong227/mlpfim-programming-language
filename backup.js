while(code.includes("{") && code.includes("}")){

    var tmpString = code.substring(code.lastIndexOf("{") + 1, code.lastIndexOf("}"));

    code = code.replace(tmpString, eval(tmpString)).replace("{", "").replace("}", "");

}

// basic input

if(keyword.includes("dearPC") && !keyword.includes("//")){

    var word = code.split(keyword)[1].split("\"")[1];
    console.log(word)

}

// set up variable

else if(keyword.includes("let") && !keyword.includes("//")){

    var varName = code.split(" ")[1];
    var varValue;
    if(code.includes("\"") && code.includes("\"")){
        code.split("\"")
        varValue = code.split("\"")[1];
        eval(`var ${varName} = "${varValue}" `);
    }else{

        varValue = code.split("let")[1].split(varName)[1];
        eval(`var ${varName} = ${ eval(varValue) }`);

    }

}

// basic input

else if(keyword.includes("spike") && !keyword.includes("//")){
    var varName = code.split(keyword)[1].trim();
    process.stdin.on("data",function (data) {
        data = data.trim();
        data = `"${data}"`;
        eval(`var ${varName} = ${data}`);
        main(i);
        process.exit();
    });
    return false;

}


// handling error

else{
    console.log(`I just don't know what when wrong: ${code}`);
}