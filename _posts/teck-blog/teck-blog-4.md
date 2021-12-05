---
title: HTTPとは何かメモ
slug: teck-blog-4
tag: ['HTTP', 'frontend loadmap']
image: study.png
created_at: 2021-12-02T23:11:36
description: Frontend loadmapをみて推奨されているものについての勉強
---

# HTTPとは

HTMLドキュメントなどのリソースをfetchするためのプロトコル。

TCP通信を用いて、クライアントにHTML等のコンテンツを受け取る。

HTMLだけでなく画像や映像も受け取ることができたり、オンデマンドにwebページを更新することもできる

# HTTPベースのコンポーネント

個々のリクエストはサーバーに送信され、サーバーはそれを処理して、レスポンスと呼ばれる回答を提供する

クライアントとサーバーの間には、プロキシと総称される多数のエンティティがある。
これらのエンティティは、たとえば、さまざまな操作を実行し、ゲートウェイまたはキャッシュとして機能する。

# レンダリングエンジン

要求されたコンテンツをブラウザの画面に表示すること

## メインフロー

要求したドキュメントのコンテンツをネットワーキングレイヤから取得する。この処理は８KBでおこなわれる

1. レンダリングエンジンはHTMLドキュメントの解析を開始し、タグを「コンテンツツリー」というツリー内のDOMノードに変換する。外部のCSSファイルとstyle要素内のスタイルデータを解析する。

2. スタイル情報とHTML内の視覚的な指示を組み合わせて`レンダーツリー`という別のツリーを作成する。

3. `レイアウト`処理に進み、画面に表示される正確な座標が書くノードに割り当てられる。

4. 最後に`描画` レンダーツリーが走査され、UIバックエンドレイヤを使用して書くノードが描画される


## 解析

`字句解析`と`構文解析`の二つのサブプロセスに分けることができる

`字句解析`は入力をトークンに分割する処理

構文解析は、言語の構文ルールを適用すること。

入力を有効なトークンに分割する`レキサー`と言語の構文ルールに従ってドキュメントの構造を分析し、解析ツリーを構築する`パーサー`によって、解析が行われている。

## 変換

多く

# 参考

https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview