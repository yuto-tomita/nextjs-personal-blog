---
title: Next.jsで個人ブログを作ったときに得れた知見
slug: teck-blog-5
tag: ['Next.js']
image: study.png
created_at: 2021-12-30T22:18:59
description: Next.js + Typescriptを使用して静的なブログを作成した際に得た知見を書いていく
---

# このブログの技術スタック

- Hosting
  - Vercel
- UI
  - AntDesign
- FrontEnd
  - Typescript
  - React.js(Next.js)

# Next.jsを使用して得れた知見

## SSGとは
`Static Site Generation`の頭文字をとったもの

ビルド時にサーバー側でデータを取得して、HTMLを生成し、リクエストに対して生成したHTMLを返す。

事前にHTMLを生成するため、CDNにキャッシュさせることができるため、SSRよりもパフォーマンスに優れる。

Next.jsでは`getStaticProps`という関数が用意されていて、それを使用することでSSGを実現できる。

## getStaticPropsやAPIRoute内ではNode.jsが実行できること

VercelにデプロイすることでNode.jsの実行環境が整っているため使用できる。

`getStaticProps` や`APIRoute`はクライアントサイドではなくサーバーサイドで実行されるため、Node.jsが実行できる

## getStaticProps

Next.jsがビルド時にデータ収集する関数

```next
export async function getStaticProps() {
  // データ収集するスクリプト

  return {
    props: {
      ...
    }
  }
}
```

上記のように記述することで、`getStaticProps`を使用することができる

## getStaticPath

> データに基づきプリレンダリングする動的ルートを特定する

ページが動的ルートを持ち、かつ`getStaticProps`を使用する場合、ビルド時にHTMLをレンダリングするためのパス一覧を定義する必要がある。

動的ルートを使ったページから`getStaticPaths`という`async`関数をエクスポートすると`getStaticPaths`で指定された全パスを静的にプリレンダリングする

```next
export async function getStaticPaths() {
  return {
    paths
  }
}
```

上記のように記述することで、`getStaticPaths`を使用することができる

## useEffectの使い方

`useEffect`を使用すると、レンダーの結果が画面に反映された`後`に動作する。

第一引数と第二引数をとることができ、第二引数をとるかとらないかで挙動が変わるため結構詰まった。

### 第二引数を取るパターン

```react
const [count, setCount] = useState(0)

useEffect(() => {
  console.log('画面にレンダリングされた後にlogが表示される')
}, [count])
```

第二引数に`[count]`をとることで、countの値が変わり、DOMの反映の終わった後に`console.log`が開発者ツールに表示されるようになる。

### 第二引数を空配列にするパターン

第二引数を空配列にすることで、初回レンダリング時の一度だけ実行されるようになる。

useStateの値と依存しないため、初回のみの実行になる。vueでいう`created`みたいなかんじか。

```react
useEffect(() => {
  console.log('初回レンダリング時のみ実行')
}, [])
```


# 最後に

Reactの勉強とNextの勉強を両方同時に行うことで結構キャッチアップに苦戦した。特に`getStaticPaths`と`useEffect`が全然わからず結構苦戦した。

SSGに構成にすることで高速にページが表示されるのが嬉しいポイント。Headerのnavigationのリンクもprefetchしているため、ページ遷移もサクサクになっているのも嬉しいポイント。

次は何を作ろうか。。。