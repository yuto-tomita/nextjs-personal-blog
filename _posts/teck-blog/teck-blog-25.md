---
title: DOMとは何か
slug: teck-blog-25
tag: ['html', 'JavaScript']
image: study.png
description: DOMとは何か
created_at: 2022-4-23T22:57:20
---

VueやReactのおかげで直感的にUI操作が出来るようになった昨今、そもそもDOMとはなんなのかを知らないエンジニアも巷にはいらっしゃるのではないのでしょうか。

私もその一人でした。

Vueはなんとなくわかるけど、Vueが何の課題を解決するものなのかをよく知らない。
そもそもJavaScriptがなんなのかをよく知らないエンジニアでした。

そんなのがフロントエンドエンジニアを名乗ってはいけないと思い、半年程前からJavaScript周りの基礎を勉強し始めています。

今日はDOM編です。

# DOMとは
DOMまたの名を**Document Object Model**と呼びます。
HTMLとJavaScriptをつなぐインターフェース(架け橋)のようなものです。

DOMはHTMLをもとにツリー状に構成されます。

JavaScriptでDOMを取得し、DOM構造を操作することで、HTMLの内容を動的に変更させHTMLに動きをもたせることができます。

ブラウザがHTMLをパースする段階で、記述されているHTMLをもとにDOMツリーを生成します。

# DOMにアクセスする

DOMにアクセスすることで、DOM操作を行う事できます。
例えば、文字を変更したり、色を変えてみたり、クリックしたらサーバーに値を送信したりといろんな事ができます。

DOMにアクセスする際は下記のメソッドを主に使用します。

### getElementById()

```html
<div id="hoge">hoge</div>
```

HTML中にある`id`属性からDOMを取得します。
そのため`id`属性は一意な値でないとバグの原因になるので注意が必要です。

### querySelector()
これはHTML中のセレクタをもとにDOMを取得します。

セレクタとはCSSでスタイルを適用する要素を指定する際に使用するものです。
ですが、DOMを取得する際にも使用することができます。

```html
<p class="my-class"></p>
```

```js
// やっていることは2つとも同じです。

const p = document.querySelector('p')
const p = document.querySelector('.my-class')
```


### querySelectorAll()

これはHTML中の指定したセレクタすべてを取得するメソッドです。


# 実践

適当なHTMLファイルを作成して、いつもの雛形を書きます。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Learn DOM</title>
  </head>
  <body>
    <h1>Title</h1>
  </body>
</html>
```

`<h1>Title</h1>`をクリックしたら、`Title`という文言を`Not Title`という文言に変更するスクリプトを記述してみます。

```js
<script>
const h1 = document.querySelector('h1')

h1.onclick = () => {
  h1.innerText = 'Not Title'
}
</script>
```

`h1`要素をクリックしたら文言が変わると思います。
DOMには複数のインタフェースとオブジェクトが用意されています。
DOM中の`innerText`というインタフェースをいじれば中身の文言を操作することができます。
たくさんのAPIが用意されているので、[MDN](https://developer.mozilla.org/ja/)とかで調べてみるのもいいかもしれません。

余談ですが、こうやってDOMを取得してJavaScriptによって操作することを**命令的UI**と呼んだりします。

おわり