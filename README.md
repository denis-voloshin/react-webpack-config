# React Webpack
[Webpack](https://webpack.js.org/) configuration for building JSX [React](https://reactjs.org/) components into single bundle file.

## Installation
Install all required dependencies using
```
yarn install
```

If you want to integrate webpack in existing project run
```
yarn add --dev @babel/core @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-react autoprefixer babel-loader clean-webpack-plugin css-loader cssnano extract-text-webpack-plugin@next file-loader html-webpack-plugin node-sass postcss-flexbugs-fixes postcss-loader sass-loader serve style-loader uglifyjs-webpack-plugin webpack webpack-cli webpack-dev-server
```

## Requirements
Config is compatible with Webpack 4 or later.

This config supports only such project structure:
```
/
   /config
     babel.config.js
     env.dev.js
     env.prod.js
     global.config.js
     webpack.config.dev.js
     webpack.config.prod.js
   /public
     favicon.ico
     index.html
   /src
     index.js
   package.json
```

## Usage
`package.json` provide such commands:
- `yarn start`  - start webpack development server
- `yarn build:prod` - **production** build of all your files from `/src` to `/dist` folder
- `yarn build:dev` - **development** build of all your files from `/src` to `/dist` folder
- `yarn serve:prod` - serve **production** build
- `yarn serve:dev` - serve **development** build

## Features
This config provide you `.js` and `.jsx` support, processing `.scss` and [PostCSS](https://postcss.org/), and file uploading.

You can specify environment defaults in `env.prod.js` file for **production** and in `env.dev.js` for **development** in `/config` folder. After build file `env.js` will be created with environment defaults if was not created by yourself.

File `/config/global.config.js` contains global config (such as site title).

Default values are:
```javascript
module.exports = {
  // Site title to be injected to <title></title> tag in index.html
  siteTitle: "ReactJS Webpack",

  // Auto open browser after starting Webpack development server
  autoOpenBrowser: true,

  // Development server port
  devPort: 3000
};
```
If property(-ies) is not defined, the default value will be used.

The [serve](https://www.npmjs.com/package/serve) package was included as well, which allows you simply serve your build by running
```
serve -s ./dist
```
By default **production** will be served on **80**th port and **development** - on **8080**th one.

You can modify it in `package.json` file in `scripts` section:
```json5
"scripts": {
  // ...
  "serve:prod": "yarn run build:prod && serve -s ./dist -l 80",
  "serve:dev": "yarn run build:dev && serve -s ./dist -l 8080"
}
```
