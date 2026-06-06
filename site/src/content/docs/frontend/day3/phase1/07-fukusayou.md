---
title: "7 - 副作用"
---

React における副作用（Side Effect / Effect）とは、**React の管理外で DOM を更新する処理や API との非同期通信等のデータ取得など、UI の構築以外の処理**を指します。

## 7.1 useEffect フック
React で副作用を用いた処理を行うには、`useEffect` フックを利用します。`useEffect` フックの書式は次の通りです。

```ts
useEffect(コールバック関数, [依存する変数の配列]);
```

**コールバック関数の実行タイミングは、コンポーネントのマウント後**です。**マウントとは、コンポーネントに対応する DOM ノードを作成し、既存の DOM ツリーに挿入して最終的な UI に出力する処理**です。即ち、UI が構築された後に呼び出されます。

第 2 引数には、第 1 引数によって指定された関数の実行タイミングを制御するための変数を指定できます。次の例は、カウンタのボタンがクリックされるごとにページのタイトルを更新するようなコンポーネントの例です。

**Counter2.tsx**

```tsx
import { useEffect, useState } from "react";

export default function Counter2() {
  const [count, setCount] = useState<number>(0);

  // count が変更された際に実行されるコールバック関数
  const callback = () => {
    document.title = `クリック数：${count}回`;
  };
  
  // count に変更があった場合に callback を実行する
  useEffect(callback, [count]);

  // ボタンクリック時のイベントハンドラ
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>{count}</button>
    </div>
  );
}
```

`useEffect` によって `count` の変更を監視し、変更とともに `callback` 関数を呼び出しています。この依存配列には状態または props を指定することができ、逆に空の配列を渡した場合にはマウント時のみに実行されます。次のコンポーネントは、マウント時にのみアラートを表示するようなコンポーネントです。

**Alert.tsx**
```tsx
import { useEffect } from "react";

export default function Alert() {
  // マウント時に実行されるコールバック関数
  const callback = () => {
    alert("マウントされました！");
  };

  // マウント時に callback を実行する
  useEffect(callback, []);

  return <p>ダミーテキスト</p>;
}
```

なお、**`useEffect` は一つのコンポーネントの中で何度も使用することができます**。そのため依存する変数によって処理を変えることができます。

## 7.2 クリーンアップ関数
`useEffect` のコールバック関数の返り値には関数を指定することができます。この関数は**クリーンアップ関数**と呼ばれ、**コンポーネントがアンマウントされる時にする処理を記述**することができます。特に `useEffect` で `addEventListener` などの関数を呼び出してイベントリスナを設置しているような場合、再レンダリングのたびにイベントリスナが登録されてしまうことがあります。このような状況を避けるためにも、**アンマウント時にイベントリスナを削除する**など、適切な処理を行う必要があります。

なお、クリーンアップ関数は、コンポーネントがアンマウントしたときだけでなく、変更の発生によってコールバック関数が再度実行された時にも実行されます。次の例で挙動を確認してみましょう。

**Counter3.tsx**
```tsx
import { useEffect, useState } from "react";

export default function Counter3() {
  const [count, setCount] = useState<number>(0);

  const cleanup = () => {
    console.log('クリーンアップされました！');
  }

  // count が変更された際に実行されるコールバック関数
  const callback = () => {
    document.title = `クリック数：${count}回`;

    return cleanup;
  };
  
  // count に変更があった場合に callback を実行する
  useEffect(callback, [count]);

  // ボタンクリック時のイベントハンドラ
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>{count}</button>
    </div>
  );
}
```

開発者ツールのコンソールタブを開くと、ボタンをクリックするたびに `クリーンアップされました！` と表示されているはずです。

## 7.3 コンポーネントのレンダリングと描画
以下の内容は参考文献「基礎から学ぶ React / React Hooks 実践入門」211 ページからの引用です。

コンポーネントのレンダリングは次のタイミングで行われます。

- コンポーネントの初回レンダリング時
- 親コンポーネントがレンダリングされたとき（全ての子コンポーネントは無条件にレンダリングされる）
- コンポーネント内で定義された `useState` による状態変数に変化があったとき
- （カスタムフックからコンポーネントが受け取っている変数が変化したとき）

React がレンダリングを行うのは、変更前と変更後の仮想 DOM を構築して変更差分を検出するためであり、リアル DOM を構築する必要があるかどうかを知るためのプロセスです。変更差分がなければ DOM の更新は行われません。リアル DOM の構築は以下の通りです。

1. 変更前の仮想 DOM と変更後の仮想 DOM を用意する
2. コンポーネントの状態が書き換えられる
3. 書き換えられた状態を用いて仮想 DOM を再構築する
4. 変更前と変更後の 仮想 DOM を比較し、差分を検出する
5. 検出された差分のみリアル DOM に反映する

描画とは、レンダリングによって変更差分が見つかった場合に構築されたリアル DOM をブラウザに反映させることです。React がコンポーネントを際レンダリングしても、変更差分がなければ描画されません。