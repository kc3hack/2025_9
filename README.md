#　ほんまかいな

![プロダクト名](https://kc3.me/cms/wp-content/uploads/2024/11/hack25-eyecatch.png)
<!-- プロダクト名・イメージ画像を差し変えてください -->


## チーム名
チーム9 Yaken
<!-- チームIDとチーム名を入力してください -->


## 背景・課題・解決されること
関西の観光地は人気が集中しすぎて、交通渋滞や公共交通の混雑、観光地の魅力が薄れている現状があります。そこで、私たちは地域ごとの魅力を再発見し、観光客を分散させる方法を考えました。例えば、観光地だけじゃなく、少し離れた場所でも楽しめる謎解きイベントや地元の特産品を使ったワークショップなどを提供します。こうした体験を通じて、観光客に地域の文化や歴史を学んでもらい、関西全体を楽しんでもらいます。

さらに、地域住民とも協力し、観光が地域活性化に繋がるような仕組みを作ります。観光と地域が一緒に盛り上がれるような仕組みを作り、持続可能な観光を実現していきます。関西を「いい感じに」するために、みんなで取り組んでいきたいと思います。
<!-- テーマ「関西をいい感じに」に対して、考案するプロダクトがどういった(Why)背景から思いついたのか、どのよう(What)な課題があり、どのよう(How)に解決するのかを入力してください -->


## プロダクト説明
謎解きができるマップアプリです。
<!-- 開発したプロダクトの説明を入力してください -->


## 操作説明・デモ動画
[デモ動画はこちら](https://www.youtube.com/watch?v=fbzGp0XJGq8)
<!-- 開発したプロダクトの操作説明について入力してください。また、操作説明デモ動画があれば、埋め込みやリンクを記載してください -->


## 注力したポイント

### アイデア面

### デザイン面

### その他

- *ステージング環境/本番環境がある*
  - production
    - https://akane.yaken.org
  - staging
    - https://st-akane.yaken.org
  - local
    - https://local.akane.yaken.org
  - staging にはアクセス制限をかけています。
  - ローカルにはCAを建てて https 接続ができるようにしています。
- *運用を見据えて管理画面がある*
  - production
    - https://admin-akane.yaken.org
  - staging
    - https://admin-st-akane.yaken.org
  - local
    - https://admin.local.akane.yaken.org
- **画像アップロードには署名付きURLを発行している**
- **本番・ステージング環境共にMackerelを使って監視している**
- **各環境へのデプロイはGitHub Actionsで自動化してある**
- **管理画面＋ステージング環境には認証が入る**
  - Cognito みたいなやつを Cloudflare Access で実現している
- **スクラム開発を導入**
  - p-rはすべてレビュー必須
  - カンバンを活用した
  - Scrapbox でオンラインコミュニケーションを促進

## 使用技術

<!-- 使用技術を入力してください -->


<!--
markdownの記法はこちらを参照してください！
https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
-->
