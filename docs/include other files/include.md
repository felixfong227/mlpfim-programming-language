# include

If you want to include an other `mlp` or `mlpfim` source file

```mlpfim
`sourceFile1.mlp`
dearPC "I'm from source file 1";
```

```mlpfim
`sourceFile2.mlp`
include "sourceFile1.mlp";
```