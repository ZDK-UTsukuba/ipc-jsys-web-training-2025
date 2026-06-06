---
title: "Phase 1: 環境構築しよう"
description: "環境構築をします。"
---

今回の研修では、匿名掲示板Webアプリケーションを題材にしていきます。

# テンプレートリポジトリのクローン

[テンプレート用のリポジトリ](https://github.com/sohosai/web-training-2026-template)を用意しました。

これに沿って実装を進めていきます。

まず、

```sh
git clone https://github.com/sohosai/web-training-2026-template
```

して、リポジトリをcloneしましょう。

cloneしたリポジトリを眺めてみると、

```sh
backend/ # バックエンドのテンプレート。
  src/
    index.ts
    ...
  package.json
  ...
frontend/ # バックエンドに対応したフロントエンドのテンプレート。検証に使える。
  src/
    main.tsx
    ...
  package.json
  ...
```

というように`backend/`, `frontend/`の主に2つのディレクトリが入っているのが分かります。

どちらも`package.json`があり`src/`内にTypeScriptのコードがある(それぞれ独立した)Node.jsプロジェクトであるのが分かります。

# Docker の導入

`backend/` をよく見てみると、
`Docker`, `docker-compose.yml`, `.dockerignore`などとあり、*Docker*というキーワードがあるようです。
これは何でしょうか?

調べると出てくると思いますが、
Dockerというのは「コンテナ」と呼ばれる種類の仮想化技術の実装の1つです。

コンテナというのはLinuxのOSの機能で実現される隔離空間で、
**任意のLinuxマシンの上で、LinuxをOSまるごと固めたものを持ってきて動かせる**という技術です[^container]。

OSが丸ごと動くタイプの仮想マシン(VM)と概念的には近いです[^vm]。

*OS丸ごと固めたもの*を持ってきて動かせるので、(一度Dockerなどのコンテナエンジンを用意できれば)
環境構築が楽で再現性がそれなりにある、という便利さから、
Webアプリケーションの開発現場や、ソフトウェアサービスをホストする際に[^cloudnative]、
近年多く使われている技術です。

なんで今回これが出てくるのかというと、バックエンドを動かすために必要な登場人物

- バックエンドサーバ (Web API, アプリケーション自体, 今回はTSで書かれている)
- データベース (今回はMySQL)

の環境を、簡単に、そしてお手元のPC1台で動くようにしたいからです。
そのために、複数の「サーバ」を仮想的に動かすのにコンテナ技術が丁度良いわけです[^webapp-container]。

説明はこれまでにして、Dockerを入れていきましょう。

時間的にすべての環境でのインストール方法を書けなかったので、
周りの2年生やチューターに聞いてください。

- Windows をお使いの方

  Docker Desktop というものを入れます。
  コンテナはそもそもLinux上で動くものなので、
  Docker Desktopが仮想的にLinuxを立ててそのうえでよしなにコンテナを立ててくれます。

  https://docs.docker.jp/desktop/install/windows-install.html が参考になるかもしれません。

  **NOTE: WSL も入れたほうが良いです。**

- macOS をお使いの方

  Windows同様、Docker Desktop というものを入れます。

  https://docs.docker.jp/desktop/install/mac-install.html が参考になるかもしれません。

- Linux をお使いの方

  素晴らしいですね!
  あなたのPCには真のネイティブなDockerが入ります。

# フロントのテンプレートを動かすために

フロントのテンプレートを動かしたい場合、 Node.js が必要です。

すでに他で入れている or [フロントエンドコースの説明](/frontend/day2/phase1) が参考になると思うので、割愛します。

---

[^container]: まあ、固めているのはファイルシステムでOS(カーネル)はホストのものそのものだという難しい話題は今回は省きます。

[^vm]: `OSが丸ごと動くタイプの`と言ったのは、JVMのような言語を動かすためのVMなどがあるからです。

[^cloudnative]: いわゆる、*クラウドネイティブ*ってやつですね。

[^webapp-container]: そういうわけで、多くのWebアプリケーションの開発現場で使われています。
