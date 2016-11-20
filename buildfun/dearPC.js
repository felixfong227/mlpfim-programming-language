module.exports = {

    dearPC: function (code,keyword) {

        var word = code.split("\"")[1];
        // template strings
        while (word.includes("${") && word.includes("}")) {
            var tmpString = word.split("{")[1].split("}")[0].trim();
            word = word.replace(tmpString, eval(tmpString)).replace("${", "").replace("}", "");
        }

        if(word.includes("__mlpInterperterOutput_newLine__")){
            var bigWord = [];
            word.split("__mlpInterperterOutput_newLine__").forEach(function (chunk) {
                bigWord.push(chunk + "\n");
            });

            bigWord.forEach(function (chunk) {
                bigWord = bigWord.toString();
                bigWord = bigWord.replace(",","");
            });
            console.log(bigWord);

        }else{
            console.log(word);
        }

    }

}