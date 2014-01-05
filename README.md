# NodeJS 網站

* [Hackpad](https://nodejs-tw.hackpad.com/)

## 使用技術

### LiveScript

LiveScript 非常簡化，而且同一件事情寫法很多種，如果寫法不統一程式碼會亂，所以請統一寫法，請 **嚴格遵守** LiveScript style guide，其他這份文件沒列到的就繼承 nodejs coding style 還有 Google 的 JavaScript style guide。

* [LiveScript](http://livescript.net/)
* [gkz/LiveScript-style-guide](https://github.com/gkz/LiveScript-style-guide)
* [felixge/node-style-guide](https://github.com/felixge/node-style-guide)
* [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

### Stylus

class 命名使用 [smacss](http://smacss.com/) + [bem](http://bem.info/method/)

* [Stylus](http://learnboost.github.io/stylus/)
* [BEM思想之彻底弄清BEM语法](http://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html)

Example:

``` html
...
<body>
  <header class="header header--page">
    <h1 class="header__title">Site Name</h1>
  </header>
</body>
...
```

### Jade

* [Jade](http://jade-lang.com/)

### Generator

#### Config

```json
{
  "generator": {
    "[名稱]": {
      "template": "[Template 檔案（Jade）]",
      "source": "[Markdown  檔案來源]",
      "destination": "[輸出目錄]"
    }
  }
}
```

#### Command

```bash
node ./tools/generator/index.js [名稱1] [名稱2]
```

## License

Copyright (c) 2013 NodeJS.tw Licensed under the MIT license.
