---
title: TIL
slug: teck-blog-21
tag: ['html']
image: study.png
description: web.devフォームセクション1-2のリーディング - ユーザーがフォームにデータを入力できるようにする
created_at: 2022-3-8T22:57:20
---

# フォーム要素とは

下記のようなHTMLがあるとします。

```html

<form>
	<input type="text" id="name" name="name">
	<input type="file" id="photo" name="photo">

	<button>submit</button>
</form>
```

上記のHTMLを見ると、同じHTMLでも`text`と`file`で見た目が異なっている。

なぜなら、ブラウザは`input`の`type`属性を読み取って、そのフォームに最適なユーザーインタフェースを提供している。

*ブラウザごとにフォームのデフォルトスタイルは異なっている*


# フォーム要素のラベル

たとえば、メールアドレスが入力できるフォームを設置しているとする。

どうやってメールアドレスを入力するためのテキストボックスだと知ることができるのだろうか。

この問題を解決するためにフォームを説明するためのタグ、`<label>`というタグが存在する。

```html
<label for="mail">メールアドレスを入力してください</label>
<input type="text" id="mail" name="mail" />
```

`label`の`for`属性と、`input`の`id`属性で、お互いを紐づけることができる。


# フォームのグループ化

時にフォームをグループ化したいとなった時に使えるのが`fieldset`タグ。

```html

<fieldset>
  <legend>好きな食べものを選んでね</legend>
	<label for="apple">りんご</label>
	<input type="radio" name="apple" value="apple" id="apple" >
	
	<label for="banana">バナナ</label>
	<input type="radio" name="banana" value="banana" id="banana" >
<fieldset>
```

`legend`とは、グループ化されたフォームの説明として使用する。

# フォームの送信

ユーザーがフォームを送信したいとなった時に使用するタグが`button`タグ

```
<button>submit</button>
```

ユーザーがsubmitボタンを押下したら、ブラウザーは`action`属性で指定されているURLに対してリクエストを送信する。

**form内の全てのbuttonタグはデフォルトで送信ボタンとして機能する。**

**もしただのbuttonとして、機能させたい場合は`<button type="button"></button>`と記述することで、フォーム内容が送信できなくなる。**

`button`の代わりに`input`でもフォーム内容を送信することができる。

```html
<input type="submit">
```

