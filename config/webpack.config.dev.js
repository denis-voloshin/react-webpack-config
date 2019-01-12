// Core
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

// Plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AutoPrefixer = require("autoprefixer");
const PostcssFlexbugsfixes = require("postcss-flexbugs-fixes");

// Environment
if (!fs.existsSync(path.resolve(__dirname, "env.js"))) {
  fs.copyFileSync(path.resolve(__dirname, "env.dev.js"), path.resolve(__dirname, "env.js"));
}
const env = require(path.resolve(__dirname, "env.js"));
let nodePaths = [];
if (env.NODE_PATH) {
  nodePaths = env.NODE_PATH instanceof Array ? [...env.NODE_PATH] : [env.NODE_PATH];
}

// Global config
const config = require(path.resolve(__dirname, "global.config.js"));

// Webpack config
module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "../src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash:10].js"
  },
  resolve: {
    modules: [
      ...nodePaths.map(nodePath => path.resolve(__dirname, "../", nodePath)),
      "node_modules"
    ]
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: config.autoOpenBrowser || true,
    port: config.devPort || 3000
  },
  plugins: [
    new CleanWebpackPlugin(["dist"], {
      root: path.resolve(__dirname, "../")
    }),
    new HtmlWebPackPlugin({
      inject: true,
      template: path.resolve(__dirname, "../public/index.html"),
      title: config.siteTitle || "ReactJS Webpack",
      favicon: path.resolve(__dirname, "../public/favicon.ico")
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(env)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif|bmp)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  outputPath: "static/img",
                  name: "[name].[hash:10].[ext]",
                }
              }
            ]
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            resolve: {
              extensions: [".js", ".jsx"]
            },
            use: [
              {
                loader: "babel-loader",
                options: {
                  configFile: path.resolve(__dirname, "babel.config.js")
                }
              }
            ]
          },
          {
            test: /\.s?css$/,
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  camelCase: true,
                  importLoaders: 1,
                  localIdentName: "[local]__[hash:5]"
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [
                    PostcssFlexbugsfixes,
                    AutoPrefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9",
                      ],
                      flexbox: "no-2009",
                    }),
                  ],
                },
              },
              { loader: "sass-loader" }
            ],
          },
          {
            exclude: [/\.jsx?$/, /\.html$/, /\.json$/, /\.scss$/],
            loader: "file-loader",
            options: {
              name: "static/media/[name].[hash:10].[ext]",
            },
          },
        ],
      }
    ]
  }
};
