var autoprefixer = require('autoprefixer');
var postcssPxtorem = require('postcss-pxtorem');

module.exports =  (ctx) => ({
    plugins: [
        autoprefixer({
            browsers: ["last 2 versions", "iOS >= 7", "Android >= 4"]
        }),
        precss,
        // assets({
// base64编码
        // }),
        postcssPxtorem({
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            selectorBlackList: [/^html$/],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ]
});
//雪碧图相关代码
let spritesConfig = sprites({
    retina: true,//支持retina，可以实现合并不同比例图片
    verbose: true,
    spritePath: './public/images/',//雪碧图合并后存放地址
    stylesheetPath: './public',
    basePath: './',
    filterBy: function (image) {
        //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
        //
        if (image.url.indexOf('/images/sprites/') === -1) {
            return Promise.reject();
        }
        return Promise.resolve();
    },
    groupBy: function (image) {
        //将图片分组，可以实现按照文件夹生成雪碧图
        return spritesGroupBy(image);
    },
    hooks: {
        onUpdateRule: function (rule, comment, image) {
            //更新生成后的规则，这里主要是改变了生成后的url访问路径
            return spritesOnUpdateRule(true, rule, comment, image);
        },
        onSaveSpritesheet: function(opts, groups) {
            return spritesOnSaveSpritesheet(true, opts, groups);
        }
    }
});
