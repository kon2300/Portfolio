# KAKE-BO

![kake-boPreview](https://user-images.githubusercontent.com/74819209/143963410-deda5728-ca99-46a9-9ff5-9d4854e8150d.gif)

## Description

- 家計簿を投稿・共有するアプリケーションです。
- 支出を視覚化し、日々の節約を意識づけます
- また、他の方の支出も閲覧できるので、節約の参考にすることができます。
- ※レスポンシブ対応済

### URL

[家計簿投稿アプリケーション](https://kake-bo.ml)

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

![kake-boNW構成図](https://user-images.githubusercontent.com/74819209/143965547-3da318f7-4dd7-4e91-b601-5d3c81349dcc.png)

### Circle CI/CD

- main ブランチへマージされると、EC2 へ自動デプロイされます。
- 併せて、S3 へ、自動ビルドされたコードが自動アップロードされます。

## Function List

![kake-bo機能一覧](https://user-images.githubusercontent.com/74819209/143966471-b9e4fed6-c8b5-4d78-a34e-08b462e20dd2.png)

## Database ER Configuration diagram

![kake-boER図](https://user-images.githubusercontent.com/74819209/143965469-5aa3dee0-3b40-4e95-8419-92e985b2d9b0.png)

## Author

- kon
