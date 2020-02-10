# @livelybone/react-query-list
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-query-list.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-query-list)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-query-list.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-query-list)
![gzip with dependencies: 4kb](https://img.shields.io/badge/gzip--with--dependencies-4kb-brightgreen.svg "gzip with dependencies: 4kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A component of React for query list, includes pagination

## repository
https://github.com/livelybone/react-query-list.git

## Demo
https://github.com/livelybone/react-query-list#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/react-query-list.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/react-query-list
```

## Global name - The variable the module exported in `umd` bundle
`ReactQueryList`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

## Usage
```typescript jsx
import ReactQueryList from '@livelybone/react-query-list'

const App = () => {
  return (
    <ReactQueryList
      onQuery={({ pageIndex, pageSize }) => Promise.resolve({ list: [], pageCount: 10 })}
      queryAtMounted={true}
      paginationProps={{ pageSize: 10, pageIndex: 1 }}
      className="custom-class-name"
      loadingComp="...loading"
    >
      ...render list
    </ReactQueryList>
  )
}

// OR
const App1 = () => {
  return (
    <ReactQueryList
      onQuery={({ pageIndex, pageSize }) => Promise.resolve({ list: [], pageCount: 10 })}
      queryAtMounted={true}
      paginationProps={{ pageSize: 10, pageIndex: 1 }}
      className="custom-class-name"
      loadingComp="...loading"
    >
      {(list, error) => {
        return '...render list'
      }}
    </ReactQueryList>
  )
}
```

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/react-query-list/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/react-query-list/lib/umd/<--module-->.js"></script>
```

## style
你可能需要主动引入样式文件来应用组件的样式：
```js
// scss
import '@livelybone/react-query-list/lib/css/index.scss'

// css
import '@livelybone/react-query-list/lib/css/index.css'
```
Or
```scss
// scss
@import 'node_modules/@livelybone/react-query-list/lib/css/index.scss'

// css
@import 'node_modules/@livelybone/react-query-list/lib/css/index.css'
```

你也可以通过引入自定义的组件样式文件来自定义样式，文件可以通过复制并修改 `node_modules/@livelybone/react-query-list/lib/css/index.scss` 得到

## QA

1. Error `Error: spawn node-sass ENOENT`

> 你可能需要全局安装 node-sass，`npm i -g node-sass`
