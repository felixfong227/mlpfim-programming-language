#My Little Pony Friendship Is Magic Programming Language
<img src="http://orig09.deviantart.net/8bfc/f/2013/167/4/f/daring_dash_by_foxxarius-d69cjg9.png" />

##How to set it up? `On development`
<li>Clone the repo</li>
<li>Create a new source file end with `.mlp` or `.mlpfim`</li>

#Install the interperter
```
$ npm install mlpfim -g
```

##How to set up and running?
<li>Open up your `Terminal/Git Bash`,and `cd` into the repo you just clone down</li>
<li>Using the command at the Terminal `$ node interperter.js <mlpSourceFile>`</li>
<li>And if you want to see how much time you span on this program,you can go to the config file `mlpfimconfig.json`,and change the `dev`option `false` become `true`</li>

##Demo code
Basic output
```javascript
dearPC "Today i learn how to code";
```

Basic input
```javascript
spike name;
```

If statement
```
if true && 1 > 0
    console.log(true)
else
    console.log(false)
;
```
and much more...

###Working program
```javascript
`A Hello World Program?`
dearPC "Hello what is your name?";
spike name;
dearPC "Nice to meet you ${name} :D";
`This is a comment`
```

##JavaScript(NodeJS) error fall back
If your mlpfim code hit an error,do you allow to try running in the JavaScript engine?by default is set to `true`<br>
Go to the config file `mlpfimconfig.json`and change it `true` => `false`

##Config file
The config file it tell the interperter how to work with your program,and the config file gen by auto,so you don't need to worry about that.

Please fork this project and take it awesome<br>
This project mainly just for fun,and still on "development"
