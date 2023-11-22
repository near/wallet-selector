# NEAR wallet selector - vanilla JS example

This example shows how to use the NEAR wallet selector from a "vanilla" Javascript app, without using any framework like React or Angular.

In order to handle the imports and [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) is used. This has to be re-generated each time there is a change in the imports, but otherwise you can just make changes to the javascript or html and it will be visible instantly. For generating the import map [JSPM](https://jspm.org/) is used. The benefit of this while developing is that there is no re-bundling time like when using e.g. WebPack with React or Angular.

JSPM can also be used for creating a single file production bundle if needed.

## Creating the import map

This is only needed if imports of external scripts are changed. There's a yarn script for creating the importmap:

`yarn examples:vanillajs:generateimportmap`

## Serving the static files

[http-server](https://github.com/http-party/http-server) is used for serving the static files if you run:

`yarn serve:vanillajs`

