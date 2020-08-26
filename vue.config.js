const webpack = require("webpack");
const path = require("path");
const proxy = require("http-proxy-middleware");
const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
  return path.join(__dirname, dir);
}

// let baseApi = "'http://dp.chuangheyida.com'";
let baseApi =
  process.env.NODE_ENV !== "production"
    ? "'http://dp.chuangheyida.com/'"
    : "'/'";

let baseUrl = process.env.NODE_ENV !== "production"
? "http://localhost:8080/"
: "'/'";
// let baseFile =  + "'/Public/Activity/dist/Qiniu'";
let baseFile = `${baseUrl}/Public/Activity/dist/Qiniu`;

module.exports = {
  publicPath: "/Public/Activity/dist",
  // process.env.NODE_ENV !== 'production'
  //   ? '/'
  //   : '/Public/Activity/dist',
  outputDir: "dist",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config
      .entry("index")
      .add("babel-polyfill")
      .end();
    config.resolve.symlinks(true);
    config.plugin("define").tap((args) => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-mode") + 1];
      args[0]["process.env"].MODE = `"${mode}"`;
      baseFile =
        mode === "dev"
          ? "'http://localhost:8080/Qiniu'"
          : `${baseApi}/Public/Activity/dist/Qiniu`;
      args[0]["process.env"].BASE_API = baseApi;
      args[0]["process.env"].BASE_File = baseFile;
      return args;
    });

    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all",
      });
    }

    config.resolve.alias
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"));
  },
};
