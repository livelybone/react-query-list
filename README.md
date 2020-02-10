# @livelybone/react-query-list
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-query-list.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-query-list)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-query-list.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-query-list)
![gzip with dependencies: 4kb](https://img.shields.io/badge/gzip--with--dependencies-4kb-brightgreen.svg "gzip with dependencies: 4kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A component of React for query list, includes pagination

## repository
https://github.com/livelybone/react-query-list.git

## Demo
https://github.com/livelybone/react-query-list#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/react-query-list.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1:3000/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/react-query-list
```

## Global name - The variable the module exported in `umd` bundle
`ReactQueryList`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

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

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-query-list/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/react-query-list/lib/umd/<--module-->.js"></script>
```

## style
For building style, you may need to import the css or scss file:
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

Or, you can build your custom style by copying, editing and importing `node_modules/@livelybone/react-query-list/lib/css/index.scss`

## QA

1. Error `Error: spawn node-sass ENOENT`

> You may need install node-sass globally, `npm i -g node-sass`
