学习笔记

#### Mocha 单元测试工具的一个库
* 调用本地项目中的mocha命令时（无全局安装mocha）
  `./node_modules/.bin/mocha`
* 测试主要用于common.js中
* 可以使用一些babel插件来适应于es6 modules
  * @babel/core
  * @babel/preset-env(创建.babelrc)
  * @babel/regsiter
  * `./node_modules/.bin/mocha --require @babel/regsiter`
    - package.json > scripts > test: 'mocha --require @babel/regsiter'

#### code coverage 代码覆盖率
描述程式中源代码被测试的比例和程度，所得比例称为代码覆盖率
安装以下依赖，所有操作即可查阅文档
* nyc 
  - [文档地址](https://www.npmjs.com/package/nyc)
* @istanbuljs/nyc-config-babel babel-plugin-istanbul
  为了适应es6 modules的依赖
  - [文档地址](https://www.npmjs.com/package/@istanbuljs/nyc-config-babel)
* `nyc ./node_modules/.bin/mocha`
    - package.json > scripts > coverage: 'nyc mocha'

* 写测试用例用`npm run coverage`
* 写业务代码用`npm run test`