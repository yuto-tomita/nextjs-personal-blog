---
title: DockerでDjangoの環境構築する
slug: teck-blog-26
tag: ['Docker', 'Django']
image: study.png
description: DockerでDjangoの環境構築する
created_at: 2023-4-19T23:44:20
---

# `Dockerfile`を作成する

プロジェクトのルートディレクトリに `Dockerfile` を作成する

```Dockerfile

FROM python:3.11-slim

RUN pip install --upgrade pip

RUN mkdir /app
WORKDIR /app

RUN pip install poetry

COPY ./app ./

RUN poetry config virtualenvs.in-project true
RUN if [ -f pyproject.toml ]; then poetry install; fi
```

上記のように記述する。

`slim` はDocker image の中でも、使用頻度の低いパッケージは除外される、継承の image とのこと。

実際にデプロイすることがなく、とりあえず動く環境を作りたい際に利用検討するとのこと。

その後は、 `app` ディレクトリを作成して、 パッケージ管理ツールである `poetry` をインストールして、 `/app`の内容をホストマシンに `COPY`するといった内容になる

# `docker-compose.yml` を作成する

これも同様にプロジェクトルートディレクトリに作成する。

```docker-compose.yml

version: "3"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .dockerenv:/.venv
      - .:/app
    ports:
    - "8080:8080"
  mysql:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: django-database
volumes:
  todo-mysql-data:
```

先ほど記述した `Dockerfile` は `app` という名前のコンテナとする。

`/app` に記述されている内容は、コンテナに自動反映されるように `volumes` に登録する。

# app コンテナをビルドする

```
$ docker build -t app .
```

# ビルドした app コンテナに入る

```
docker run -it --rm -v $(pwd):/app app sh
```

# `poetry` の初期セットアップをする

app コンテナに入ってから、shell に下記コマンドを実行する

```
$ poetry init
```

対話型コマンドのため、質問に答えていく。

質問をスキップしたい場合は下記。

```
$ poetry init --no-interaction
```


上記のコマンドを実行すると `pyproject.toml` が作成されているか確認する。
