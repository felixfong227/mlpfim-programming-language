var terminal = require("child_process").exec;
module.exports = {

    system: function (code,keyword,line) {

        var command = code.split(keyword)[1].split("\"")[1].trim();
        terminal(command,function (error,data) {
            if(error){console.log(error)}
            console.log(data);
            require("../interperter").running = false;
            require("../interperter").main(line);
        });
        require("../interperter").running = true;

    }

}