module.exports = {

    spike: function (code,line) {

        var inputName = code.split(" ")[1];

        process.stdin.once("data",function (data) {
            data = data.trim();
            data = '"' + data + '";';
            eval(`${inputName} = ${data}`);
            require("../interperter").running = false;
            require("../interperter").main(line);
        });

    }

}