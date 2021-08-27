# KAKE-BO(Portfolio)

- ポートフォリオです。

## Description

- 家計簿を公開するアプリケーションです

- **[Docker](https://www.docker.com/products/docker-desktop)** を使用し、バックエンドは **[Node.js](https://nodejs.org/ja/)** 、データベースは **[Mysql](https://www.mysql.com/jp/)** 、フロントは **[Vue.js](https://v3.ja.vuejs.org/)** を使用しています

## Requirement

- [Docker](https://www.docker.com/products/docker-desktop)/docker-compose 3.8

## Usage

### 開発環境の立ち上げ

1. `.env` ファイル を作成します

   ```sh
   $ cp api/.env.example .env
   $ cp db/.env.example .env
   ```

1. イメージを構築するため [Docker](https://www.docker.com/products/docker-desktop) をインストールし `docker-compose.yml` のある場所で下記のコマンドを実行します

   ```sh
   $ docker-compose build
   ```

1. コンテナを起動するため `docker-compose.yml` のある場所で下記のコマンドを実行します

   ```sh
   $ docker-compose up
   ```

### 開発環境のマイグレーション

※ 上記開発環境立ち上げ後に実行してください

1. sequelize を使用しマイグレーションします

   ```sh
   $ npx sequelize-cli db:migrate
   ```

## Author

- kon
