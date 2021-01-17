module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData:
                    '\n          @import "~@/styles/global/_media-queries.scss";\n          @import "~@/styles/global/_variables.scss";\n          @import "~@/styles/global/_mixins.scss";\n        '
            }
        }
    },
    transpileDependencies: ["vuetify"],
    runtimeCompiler: true,
    devServer: {
        disableHostCheck: true
    }
};
