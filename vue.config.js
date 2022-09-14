const autoprefixer = require("autoprefixer");
const pxtoviewport = require("postcss-px-to-viewport");
module.exports = {
    publicPath: "./",
    parallel: false,
    devServer: {
        proxy: {
            "/api": {
                target: "https://ss.com",
            },
        },
        port: 3001,
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/assets/same.scss";`,
            },
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtoviewport({
                        viewportWidth: 375, // 设计图是638*1261的
                        exclude: [/node_modules/],
                        selectorBlackList: ["no-trans-"], // 以此开头的class被忽略转换
                    }),
                ],
            },
        },
    },
};
