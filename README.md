#My Little Pony Friendship Is Magic Programming Language
<img src="http://orig09.deviantart.net/8bfc/f/2013/167/4/f/daring_dash_by_foxxarius-d69cjg9.png" />

##How to set it up? `On development`
<li>Clone the repo</li>
<li>Create a new source file end with `.mlp` or `.mlpfim`</li>

##How to set up and running?
<li>Open up your `Terminal/Git Bash`,and `cd` into the repo you just clone down</li>
<li>Using the command at the Terminal `$ node interperter.js <mlpSourceFile>`</li>
<li>And if you want to can always add the `--dev` flag at the end of the command in order to tell you the running time you span on this program.</li>

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
dearPC "Hello what is your name?";
spike name;
dearPC "Nice to meet you {name} :D";
```

##JavaScript(NodeJS) error fall back
If your mlpfim code hit an error,do you allow to try running in the JavaScript engine?by default is set to `true`<br>
`$ node interperter.js helloPonies.mlp --js true`<br>
or<br>
`$ node interperter.js helloPonies.mlp --js false`<br>


Please fork this project and take it awesome<br>
This project mainly just for fun,and still on "development"
