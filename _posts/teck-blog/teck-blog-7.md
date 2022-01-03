---
title: 【TypeORM + Nest.js】Mysqlコンテナとの連携でハマった点を書いていく
slug: teck-blog-6
tag: ['JavaScript', 'TypeScript', 'TypeORM']
image: study.png
created_at: 2021-1-3T22:43:20
description: typeormとnest.jsでのDB周りでハマった点を書いていく
---

# Nest.jsとの連携
app.module.ts

```ts
@Module({
	TypeOrmModule.forRoot({
		type: 'mysql',
		host: // DBコンテナのイメージ名,
		port: 3306,
		username: DB_USER_NAME,
		password: DB_PASSWORD,
		database: DATABASE_NAME,
		entities: [User], // entityをimportして直接記述する
		synchronize: true
	})
})
```

これがtypeORMとNest.jsの連携。

hostがDBコンテナのイメージ名にすることでなぜか、DBと接続することができた。

# TypeORMのmigrationを実行するためのconfig

つぎにマイグレーションファイルを記述し、実行をするためのconfig

プロジェクトのrootパスに`ormconfig.js`を作成する(`ormconfig.ts`だとmigrationが実行できなかった)

ormconfig.js

```js
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
	username: DB_USER_NAME,
	password: DB_PASSWORD,
	database: DATABASE_NAME,
  synchronize: true,
  migrations: ['./src/db/migration/*.ts'],
  cli: {
    entitiesDir: './src/db/entity',
    migrationsDir: './src/db/migration'
  }
}
```

TypeORMとの違う点はCLIでentityとmigrationファイルが設置されているパスを記述しているところ。

# ハマった点

TypeORM側のdb configとNest.jsのTypeORMラッパーのdb configの両者が微妙に異なるため、DBと接続できずハマっていた。