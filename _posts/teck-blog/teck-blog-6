---
title: TypeORM CLIを叩けるようにする
slug: teck-blog-6
tag: ['JavaScript', 'TypeScript', 'TypeORM']
image: study.png
created_at: 2021-12-30T15:56:20
description: TypeORMCLIを使用できるようにするための環境構築
---

# 導入

```
$ yarn add ts-node
$ yarn add typeorm
```

# CLIで使用できるようにする

pachage.jsonに以下の一文を記述

```
"scripts": {
  "typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js"
}
```

# 動作確認
yarn typeorm
