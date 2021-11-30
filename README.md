# KAKE-BO

![kake-boPreview](https://user-images.githubusercontent.com/74819209/143963410-deda5728-ca99-46a9-9ff5-9d4854e8150d.gif)

## Description

- 家計簿を投稿・共有するアプリケーションです。
- 支出を視覚化し、日々の節約を意識づけます
- また、他の方の支出も閲覧できるので、節約の参考にすることができます。
- ※レスポンシブ対応済

### URL

![家計簿投稿アプリケーション](https://kake-bo.ml)

## Use of technology

### Development Environment

- Docker/Docker-compose

### Production environments

- Vue 3 (Vite)
- Express 4.16.1
- MySQL 5.7
- AWS

  - VPC
  - IAM
  - EC2
  - RDS
  - S3
  - CloudFront
  - Route 53
  - Certificate Manager

- Circle CI/CD

## NW Configuration diagram

![kake-boNW 構成図.pdf](https://github.com/kon2300/Portfolio/files/7621847/kake-boNW.pdf)

### Circle CI/CD

- main ブランチへマージされると、EC2 へ自動デプロイされます。
- 併せて、S3 へ、自動ビルドされたコードが自動アップロードされます。

## Function List

![kake-bo 機能一覧.pdf](https://github.com/kon2300/Portfolio/files/7621838/kake-bo.pdf)

## Database ER Configuration diagram

![kake-boER 図.pdf](https://github.com/kon2300/Portfolio/files/7621853/kake-boER.pdf)

## Author

- kon
