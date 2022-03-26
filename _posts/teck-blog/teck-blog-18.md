---
title: TIL
slug: teck-blog-18
tag: ['javascript']
image: study.png
created_at: 2022-2-27T23:24:20
description: YDKJSのリーディング
---

# TIL

## ギャップをジャンプする
ブラウザの実行環境によって、ES2019といった最近の仕様のJavaScriptの実行時に例外をスローし、エラーが起きる可能性がある。

その解決策の一つに、JSをトランスパイルすることで構文による例外を回避することができる。

トランスパイルは、`Babel`というツールを使用して、あるバージョンのコードから別の形式のコードに変換することができる。

JSで使用するトランスパイルのためのツールに`Babel`が存在し、Babelを使用することで、JSの新しい構文から古い構文に変換することができる。

## JSの処理系はなに？

JSの議論の中の一つに、JSはインタプリタされたスクリプトなのか、それともコンパイルされたプログラムなのかという議論がある。

### インタプリタ言語とは
スクリプト言語またはインタプリタ言語は、プログラムを1行ずつ実行して、エラーや予期しない動作を確認しやすいメリットがある。

しかし、1行ずつ実行するため実行速度が遅いデメリットがある。

### コンパイラ言語とは
プログラムをコンピュータが実行できる機械語、あるいは書かれているプログラミング言語よりも低いレベルのプログラムにコンパイルを行う言語のことを指す。


### そこでJSは？
まずインタプリタとコンパイラでの共通点として、プログラムを全て解析することがある。

プログラムが完全にパースされると、プログラムが解析された形式(AST)から実行可能形式に変換される。

JSソースコードは実行される前に解析される。

JSの仕様として、コードの実行される前に、初期エラー(パラメータ名の重複や、コード内で静的に決定されたエラー)を表示する必要があるため。

これらのエラーはコードが解析されていないと認識ができない。

そして、解析されたJSコードは最適化されたバイナリ形式に変換され、そのコードが実行される。

コンパイルによって、バイナリコードが生成され、JS仮想マシンに渡されて実行される。

実行エンジンは、解析されているコードをコンパイラ言語のように1行ずつ実行するようなことは、非効率なためしない。

JSソースプログラムの解析フロー
1. JSプログラムは`babel`によって古いバージョンのJSにトランスパイルされ、`webpack`によってバンドルされ、JSエンジンに渡される

2. JSエンジンはそのプログラムをAST形式に変換する

3. エンジンはAST形式からさらに、バイナリ中間表現(IR)に変換される。最適化されたJITコンパイラによってさらに最適化される。

4. 最後にJSVMが、最適化されたプログラムを実行する
  
結論として、*JSプログラムはコンパイル言語* であることが結論つけられる


