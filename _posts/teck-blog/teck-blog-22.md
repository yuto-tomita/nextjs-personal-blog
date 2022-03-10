---
title: TIL
slug: teck-blog-22
tag: ['javascript']
image: study.png
description: JSのスコープについてアウトプット
created_at: 2022-3-10T22:57:20
---

# そもそもスコープとは
実行中の式や値が参照できる範囲のことを指す

# グローバルスコープとスクリプトスコープ

`const` `let`はスクリプトスコープになる

`var` `function` はグローバルスコープになる

ただスクリプトスコープもグローバルスコープ同じような動作をする

# 関数スコープとブロックスコープ

### 関数スコープ
接頭に`function`がついているもの

```js
function test() {
	...
}
```

関数スコープ内で変数宣言すると、その関数スコープ内でしか値参照することができない

```js
function a() {
	let b = 0
	var c = 0
}

console.log(c) // error!
console.log(a()) // => 0が二つ表示される
```

# ブロックスコープ

`{}`波括弧で括られたものがブロックスコープ

```js

{
	...
}

```

ブロックスコープでは関数スコープとスコープの仕様が異なり、`let` `const`はブロックスコープ内でしか値が参照できない。

しかし、`var`や`function`はブロックスコープの外でも参照することができる。

```js
{
	var a = 0
	let b = 0
	function c() {
		console.log(0)
	}
	const d = 0
	const e = function() {
		console.log(0)
	}
}

console.log(a) // 0
console.log(b) // error!
console.log(c()) // 0
console.log(d) // error!
cosole.log(e()) // error!
```

`var`宣言するとスコープ範囲が`let`や`const`よりも広く参照可能なため、バグの温床となりやすくなっているため、開発者周りからは嫌われている。

`function`も`var`同様スコープ範囲が広いため、どこからでも呼びやすいという観点から、最近だと`const hoge = function()`みたいな無名関数と呼ばれるのが主流になっている。

ES6以降ならばアロー関数を用いて`const hoge = () => {}`みたいな書き方が多い。