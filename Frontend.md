# Frontend Note

## Server start
```
npm start
```

* 會起 8080 port，請造訪 http://localhost:8080/index



## 基本 layout 與相對應的 Markdown
* config.json

###Example:
####首頁寫法示範
```
	"index":{
      "template":"./templates/index.jade",
      "source": "./source/index/**/index.md",
      "destination": "./public/index"
    },
```

* template 位置為: template/index.jade
* source 位置為內容讀取的 markdown
* destination 為產出結果的 folder/files 位置


## 新增頁面
* 設定 config.json 極其相對應的 template 資料夾底下的 jade 檔案, source 資料夾底下的路徑/markdown檔案。
* 產出頁面或有修改頁面，請跑 command line:  `npm run gen`。
* 若該頁面的內容根本不需要 markdown，也必須要改予該頁面一個 markdown，也要記得補上標題以及 `---`(切記)，否則在 npm run gen 時不會 gen 到該頁。
 	
 	* example:

	```
	title: test
	---
	```





## 關於 CSS / JavaScript / images
###CSS 檔案放置位置:
* app/public/css/*

###JavaScript 檔案放置位置:
* app/public/js/*

###images 檔案放置位置:
* app/public/images/*


### 修改 CSS/Javascript
修改過 css 之後記得下 `grunt` 指令，其 generate 的路徑為 public/*。
