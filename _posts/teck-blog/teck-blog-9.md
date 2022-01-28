---
title: HTML標準を読む 1
slug: teck-blog-9
tag: ['html']
image: study.png
created_at: 2022-1-26T9:24:20
description: HTML標準を読んだメモ
---
HTML標準を読んでいきます。

今回の記事は下記URLの内容をメモしています。
https://html.spec.whatwg.org/multipage/introduction.html#abstract

# HTMLの歴史

1990 ~ 1995 - CERNやIETFがホストしながらHTMLの原型を作成し、何度も改定され拡張されていった

1994 - W3Cの設立(HTMLの標準化をする機関)

1997 - HTML3.2

1997 - HTML4

1998 - HTMLの進化を止め、XHTMLの作成を開始

2000 - XHTMLの完成

2003 - XFormsの発表(次世代のWebフォームと位置付けられている)

2004 - HTML5の作業の基礎となる原則をMozillaとOperaによってW3Cに提出されるも、Webの進化の方向性の矛盾という理由で却下される。

その後、Apple,Mozilla,Operaが共同でWHATWGという機関を作成

2006 - W3CはHTML5の開発に参加する意向を示す

2007 - WHATWGと共同でHTML5使用の開発を行うワーキンググループの立ち上げ

2013 - HTML5誕生

# HTML vs XML
文書やアプリケーションを記述するための抽象的な言語と、この言語を使用するリソースのインメモリ表現と対話するためのAPIを定義しています。
メモリ内表現は`DOM HTML`または`DOM`と呼ばれています。

DOMを使用できる構文として`HTML`と`XML`が使用で定義されています。

HTMLのXML構文は以前まで`XHTML`と呼ばれていましたが、本仕様ではその用語を用いることはありません。

DOM, HTML, XMLが全て同じ内容を表現することはできません。

例えば

名前空間はHTML以外では表現することができる

nosript機能はHTMLでは表現できるが、DOMとXMLは表現できない

コメントブロックはDOMでのみ表現可能だが、HTMLやXMLでは表現できない

# HTMLの簡単な紹介

```
<!DOCTYPE html>
<html lang="en">
 <head>
  <title>Sample page</title>
 </head>
 <body>
  <h1>Sample page</h1>
  <p>This is a <a href="demo.html">simple</a> sample.</p>
  <!-- this is a comment -->
 </body>
</html>
```

上記は基本的なHTMLです。HTMLドキュメントは、要素とテキストのツリーで構成されています。
HTMLユーザーエージェントは、このマークアップを解析し、DOMツリーに変換します。

変換されてたDOMツリーは、ページ内のJavaScriptから操作することができる。

DOMツリーの各要素はオブジェクトで表され、これらのオブジェクトにはAPIがあり、操作できるようになっている。

たとえば`a`タグを取得して、`href`要素のURLを変更するスクリプトを書いてみます。

```js

const a = document.links[0]
a.href = 'sample.html'
a.protocol = 'https'
a.setAttribute('href', 'https://example.com/')
```

# HTMLを使用した安全なアプリケーションの作成

HTMlを使用してサイトを作成する場合、攻撃者によってユーザーの生合成を損なう可能性のある脆弱性を導入しないように注意する必要があります。
このHTML標準の著者はより詳細に脆弱性について調べることを推奨しています。

いくつか攻撃例を紹介します。

### XSS
**Not Validate User Input**

**SQLインジェクション**

テキストコメント、URLパラメータの値、サードパーティサイトからのメッセージなど、ユーザーが生成したコンテンツなどの信頼できない入力を受け入れる場合は、使用前にデータを検証し、表示時に適切にエスケープする必要があります。

例
```html
<!-- ページがURLのクエリ文字列を調べて、何を表示するかを決定し、サイトがユーザーをそのページにリダイレクトしてメッセージを表示するとします。 -->

<ul>
 <li><a href="message.cgi?say=Hello">Say Hello</a>
 <li><a href="message.cgi?say=Welcome">Say Welcome</a>
 <li><a href="message.cgi?say=Kittens">Say Kittens</a>
</ul>

<!-- メッセージがエスケープせずにユーザーに表示された場合、攻撃者はスクリプト要素を含むURLを作成する可能性があります。 -->
https://example.com/message.cgi?say=%3Cscript%3Ealert%28%27Oh%20no%21%27%29%3C/script%3E

<!-- たとえば、このサイトが通販サイトだった場合、このようなスクリプトによってユーザーは無意識のうちに予期していないものを購入する恐れがあります。 -->
```

### クロスサイトリクエストフォージェリ(CSRF)
攻撃者が悪意のあるWebページを準備し、ユーザーを攻撃用のWebページへ誘導します。

そのページにあらかじめ用意されていたリクエストを送信し、意図しない内容をサーバーに送信される可能性があるために発生します。

サイトは、フォームにユーザー固有のhiddenトークンを生成したり、全てのリクエストで`Origin`ヘッダーをチェックすることでこのような攻撃を回避することができます。

### クリックジャッキング
iframeで表示させたページを透過させ、悪意のあるサイトを見えないようにしてクリックさせる手口があります。
これを避けるために、フレーム内で使用されていることを想定していないサイトは、フレーム内でないことを検出した場合のみインターフェースを有効にすることが推奨されます。

