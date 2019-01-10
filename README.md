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

You can specify own environment variables in `env.js`, which will be created in `/config` folder on building if you do not create it by yourself.

Defaults for **production** file is in `env.prod.js`:
```javascript
module.exports = {
  siteTitle: "ReactJS Webpack"
};
```
Defaults for **development** has the same option and two more for `webpack-dev-server` (`env.dev.js`):
```javascript
module.exports = {
  siteTitle: "ReactJS Webpack",
  autoOpenBrowser: true,
  devPort: 3000
};
```

The [serve](https://www.npmjs.com/package/serve) package was included as well, which allows you simply serve your build by running
```
serve -s ./dist
```
