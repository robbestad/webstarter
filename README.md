# Web starter

A project that gets you started with the latest and greatest frontend tech.

* Koa for serving files and assets
* Dev and Dist config
* Webpack 2 
* Inferno
* Config vetted for Mac / Windows / Linux

## Getting started

1. Clone project with ```git clone https://github.com/svenanders/webstarter.git```

2. Install dependencies (preferably with *yarn*, but plain old *npm* also works fine).    Yarn can be downloaded from [yarnpkg.com](https://yarnpkg.com/lang/en/) or installed via Brew if on Mac
       
        With yarn: $ yarn install
        With npm:  $ npm install
    
3. Start project with ```yarn dev``` (defaults to port 5001 and can be displayed on [localhost:5001](http://localhost:5001))

4. Distribution build is generated with ```yarn start``` and defaults to port 1998. It will generate tiny, optimized vendor and app bundles and a minimized index.html.

## Config

Copy the *config/index.js.example* file in ```src/config``` to ```src/config/index.js``` and add your config vars. 
This file is excluded from git.

## Developing

The source lives in the ```src``` folder.

The index.html is generated from the ```src/templtes/default.ejs``` template.

Any asset you want to add -- for instance css, local images and so on -- should be placed in the ```src/assets``` folder and 
referenced with ```/assets/``` preceding the file name.

## License

This project is dual licensed with the ISC License and the Beerware license.
Dual licensing means you can pick and choose which one you want to apply. The ISC License gives you free reign to 
do anything with it. The Beerware license encourages you to either buy me a beer "in return" or drink one for yourself. 

