module.exports = {

    let: function (code,keyword) {
        var varName = code.split(keyword)[1].split(" ")[1].trim();
        var varValue = code.split(keyword)[1].split("\"")[1];
        eval(`${varName} = "${varValue}";`);
    }

}