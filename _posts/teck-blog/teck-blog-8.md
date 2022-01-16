---
title: 【React】分割代入でPropsの値を受け取る
slug: teck-blog-8
tag: ['JavaScript', 'TypeScript', 'React']
image: study.png
created_at: 2022-1-16T23:24:20
description: ReactでPropsを分割代入で値を受け取る方法
---

# TL;DR

```typescript

interface Props {
  firstName: string
  lastName: string
}

const sampleComponent: FC<Props> = ({ firstName, lastName}) => {
  // firstNameの記述だけで値を受け取れる
}
```

このように記述すれば、Propsの中のプロパティをそのまま使用することができる

# 分割代入ってなに？

分割代入(Destructuring assignment) 配列やオブジェクトからプロパティを取り出して、別個の変数に代入することを可能にする構文

# 従来のPropsの受け取り方

これまでPropの値を受け取る時は下記のようにしていました。

```typescript

interface Props {
  firstName: string
  lastName: string
}

const sampleComponent: FC<Props> = props => {
  // props.firstNameでPropの値を受け取れる
}
```

これのショートハンドがTL;DRで記載した内容です

# 参考
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
