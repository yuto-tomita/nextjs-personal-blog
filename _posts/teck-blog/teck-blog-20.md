---
title: TIL
slug: teck-blog-20
tag: ['javascript']
image: study.png
description: web.devフォームセクション1-1のリーディング - formタグと入力データについて
created_at: 2022-3-8T23:24:20
---

# form要素ってなに？
form要素は`<form>`という開始タグと終了タグ、属性で構成された要素。

開始タグと終了タグの間に、`<textarea>`や`<input>`などのフォーム要素を含めることができる。

# データはどこで処理されるのか

フォームが送信されると、ブラウザはリクエストを行う。スクリプトはその要求に対して、データを処理することができる

デフォルトでは、リクエストはそのformが設置されているページに対して行われるが、アクション属性を使用することで、スクリプトの場所を選択することができる。

```
<form action="https://example.com/test">
```

上記のように記述すると`https://example.com/test`に対してリクエストを送信することができる。

## データはどのようにして転送されるのか

デフォルトでは、フォームデータは`GET`リクエストを投げるようになっている。

```html
<form action="https://example.com/test" target="blank">
	<input type="text" id="animal" name="animal" />
	
	<button>submit</button>
</form>
```

上記のようなformに`hoge`と入力して、`submit`ボタンを押下したら、`https://example.com/test` に対して `https://example.com/test?animal=hoge`というリクエストが投げられる


デフォルトの`GET`から`POST`に変更したい場合は、`<form>`の`method`属性を使用する

```html
<form method="post">
	...
</form>
```

`post`にすることで入力されてたフォーム内容がURLに表示されることがなく、バックエンドやフロントエンドに送信することができる

# どの方法を使用するべきか

サービスへのログインや会員登録といったユーザーの機密情報を扱う場合は`POST`を使用すべき(HTTPSを使用している場合)。

URLが表示されず、リクエストを処理するバックエンドや値を管理しているフロントエンドしかアクセスできないため。

入力されたデータが見られてもいい場合は、デフォルトである`GET`を使用してもいい。
データがURLに表示されるため、ブラウザの検索履歴に追加されるため、検索結果ページをブックマークしておくことができる。

通常のサービスの検索フォームはこれが多く使用されている





