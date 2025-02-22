# productionディレクトリ
ステージング環境や本番環境には下記コマンドでこのディレクトリのみが`clone`されます。

```sh
$ git clone --filter=blob:none --sparse git@github.com:kc3hack/2025_9.git
$ cd 2025_9
$ git sparse-checkout set production
```
