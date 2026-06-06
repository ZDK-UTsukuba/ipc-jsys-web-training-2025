---
title: "Phase 2: リクエストを受けて適当なメッセージを返そう"
description: "リクエストをハンドリングすると本当にシンプルなメッセージだけ返すWeb APIを作ります。"
---

テンプレートリポジトリの `backend/src/index.ts` を見てください。

HonoというTSでWebバックエンドを構築するためのフレームワークを使っています。

上から順に追っていくと

1. Honoの Web API アプリケーション 用インスタンスを生成

2. エンドポイントやその他を設定

3. ポート番号を環境変数から取得。デフォルトは3000

4. 準備した Web API アプリケーション 用インスタンスを使って、取得したポート番号でサーブ開始

という風になっています。

ライブラリ(今回はHono)が抽象化をしてくれているので、意外にシンプルなコードでWeb APIを作ることが出来ます。

**NOTE:** もしお使いのエディタで「`hono`というやつは知らない!」というようなエラーが出まくるようなら、`backend/`以下で`npm i`すると良いです。

```ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono(); // 1.

// 2.
app.use("*", logger());
app.use("*", cors());

/* ここに追記 */

// 3.
const port = Number(process.env.PORT ?? 3000);

// 3.
serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
```

しかし、このままでは何も動きません。

エンドポイントのハンドリングの設定を何もしていないからです。

エンドポイントというのは、
URLで、

- `hogehoge.sohosai.com/users`
- `hogehoge.sohosai.com/messages/<message-id>`

というのがあったときにドメイン`hogehoge.sohosai.com`より後ろのスラッシュで何回か区切られた部分のことを言います。
つまりこの例では、

- `/users`
- `/messages/<message-id>`

がそれぞれエンドポイントです。

クライアントはこのようにURLのパスを指定してHTTPリクエストをしてくるので、
バックエンドはある特定のエンドポイントにリクエストが来たら用意した処理をする(リクエストをハンドリングする)わけです。

さて、この `/* ここに追記 */` の部分に以下のようなコードを追加してください。

```ts
app.get("/health", (c) => c.json({ status: "ok", message: "Hello, World!" }));
```

これは、

- `/health` というエンドポイントに
- HTTPの`GET`リクエストが来たら
- `(c) => c.json(...)` の関数でハンドリングする

というのを設定しています。

Hono では、リクエストのコンテキスト`c`がハンドラ関数には渡されることになっているようで、
`c.json()`としてやると、JSON形式のレスポンスを返せます。

`(c) => c.json(...)` の部分は、

```json
{
  "status": "ok",
  "message": "Hello, World!"
}
```

というJSONをとにかく直ちに返すという、TSのアロー関数形式の関数です。

したがって、このエンドポイントにGETリクエストが来ると、登録したこの関数が(Honoによって)呼び出されてハンドリングされるわけですね。

## 動作を検証してみよう

`.env.example`をコピーして`.env`というファイルを真横に作ってください。
ポート番号やこのあと出てくるデータベースの設定といった、環境変数設定用のファイルになります。

バックエンドのディレクトリで、Docker(docker compose)を起動してください。

(`$`はシェルの入力部分ですよという意味で書いているので打たなくて大丈夫ですよ)

```sh
$ cd ./backend
$ docker compose up
```

HTTPリクエストを送りたいときのシンプルなツールとして[`curl`](https://curl.se/)というものがあります。
指定したURLを見に行く(リクエストをする)だけなので _see URL_ ということで`curl`だそうです(読み方は「カール」)。

導入してみてください。(Windows含めデフォルトで入っている環境が多いと思います。)

さて、別のターミナルから `curl` を実行してみると

```sh
$ curl http://localhost:3000/health
curl: (7) Failed to connect to localhost port 3000 after 0 ms: Could not connect to server
```

あれ、おかしいですね。

そういえば、(docker composeで)ポートを開けていませんでした!

`backend/docker-compose.yml` を見てください。

```yaml
services:
  db:
    # 略

  phpmyadmin:
    # 略

  app:
    build:
      context: .
      target: dev
    restart: unless-stopped
    environment:
      DATABASE_URL: ${DATABASE_URL}
      PORT: ${PORT}

    # ここに追記

    volumes:
      - ./src:/app/src
      - ./drizzle.config.ts:/app/drizzle.config.ts
      - ./drizzle:/app/drizzle
      - ./tsconfig.json:/app/tsconfig.json
    depends_on:
      db:
        condition: service_healthy

volumes:
  db_data:
```

`app:` の下に `# ここに追記` があります。

以下のようになるように、追記してください。
インデントが正しい必要があるので気をつけてくださいね。

```yaml
services:
  # 略

  app:
    # 略
    environment:
      DATABASE_URL: ${DATABASE_URL}
      PORT: ${PORT}

    # ここに追記
    ports:
      - "3000:3000"

    volumes:
    # 略
```

これは、コンテナ内のポート番号3000(右の3000)を、ホストPCの世界のポート番号3000に紐づけてに公開しますよ、という意味です。

これをすることで、`localhost:3000` への接続がコンテナ内のアプリケーションまで通るようになるのです。

ポート番号という概念があって、それを開放しないとアクセスできないんだよ、ということを知ってもらいたかったのです。

実際にアプリケーションをホストする際にも同様の事象はあり、
(仕組みは全く異なりますが)たとえばファイアウォールが設定されていてデフォルトではほとんどのポートへのリクエストが通らないということがあります。
そういうときもポートを開放するという設定をする必要があったりするのです。

詳しくはインフラ部門に聞いてみましょう。

---

さて、docker composeを立ち上げ直し、再度curlを実行してみると、

```sh
$ curl http://localhost:3000/health
{"status":"ok","message":"Hello, World!"}
```

無事、レスポンスが返ることを確認できました!

// TODO:
フロントからも確認できるようにする
