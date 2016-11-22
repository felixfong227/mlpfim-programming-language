var path = require("path"),
    fs = require("fs")
module.exports = {

    plugin: function (code,keyword,line) {
        var name = code.split(keyword)[1].split(".")[0].trim();
        var calling = code.split(keyword)[1].split(".")[1].trim();
        var pluginPath = path.join("../plugin/" + name);
        eval(`require("${pluginPath}").${calling}()`);
    }

}