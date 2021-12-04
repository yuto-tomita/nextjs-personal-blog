---
title: 【Vue2】computedプロパティで引数を受け取る方法
slug: teck-blog-1
tag: ['vue2', '初心者']
image: vue.jpeg
created_at: 2021-11-29T08:01:01
description: vue2のcomputedプロパティで引数を受け取る方法
---

# vue2のcomputedプロパティで引数を受け取る方法

Mustache
`sampleComputed`っていうメソッド名のcomputedを用意しました。

引数には`sample`という文字列を渡します。

```vue
<template>
  <div>
    {{ sampleComputed('sample') }}
  </div>
</template>

<script>
export default {
  computed: {
    sampleComputed() {
      return (arg) => {
        return arg // -> 'sample'
      }
    }
  }
}
</script>
```

`method`プロパティに対して引数を渡すのと`computed`との違いは下記でしょうか。

`computed`プロパティで用意したメソッドに対して、関数を`return`するように記述する。そうするとvue2で引数を受け取ることができます。

```
sampleComputed() {
  return (arg) => {}
}
```


