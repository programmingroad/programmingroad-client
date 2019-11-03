/**
 * @author: programmingroad
 * @create: 2019/11/03 17:08
 * @description:
 **/

const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),

    addLessLoader({
        javascriptEnabled: true
    }),
);