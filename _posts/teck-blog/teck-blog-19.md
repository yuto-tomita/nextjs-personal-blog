---
title: TIL
slug: teck-blog-19
tag: ['javascript']
image: study.png
created_at: 2022-2-27T23:24:20
description: YDKJS二章のリーディング
---

# 値
JSでは、値は、プリミティブ型とオブジェクトの二つの形式で提供される。

### プリミティブ
プリミティブ型とは、変数の型の分類のことであり、intとかcharとかboolとかのことを指す

### 配列とオブジェクト
オブジェクトとは、JSでは、プリミティブ以外の型はオブジェクト型に分類され、配列は、データの順序つけられた数値インデックス付きリストで構成される特殊なタイプのオブジェクトである。

```js
const names = ['taro', 'ziro', 'saburo']

names.length // 3

names[0] // taro
names[1] // ziro
```

JS配列は、プリミティブまたはオブジェクトをのいずれかの値型を保持することができる。関数も配列に保持することができる。

オブジェクトは値の順序つけられていない、キー付きのコレクションである。要素にアクセスするためには、数値の位置(インデックス)ではなく、キーまたはプロパティでアクセスする

```js

const me = {
	first: 'yamada',
	last: 'taro',
	age: 20
}

me.first // yamada
```

オブジェクトの要素にアクセスするためには、`object.key`または`object['key']`を使用することでアクセスすることができる
