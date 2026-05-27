---
title: "5 - 状態"
---

React における一大トピックスの一つに**状態（state、ステート）管理**があります。状態はコンポーネント内部で保持されるもので、画面上に表示されるデータなどアプリケーションが保持している状態を指しています。**状態は props とは異なり、後から変更することができます**（props は子コンポーネントでの変更が許可されていません）。

## 5.1 useState フック
子コンポーネントにおける状態の保持を実現するのが、`useState` フックです。フックはコンポーネントに様々な機能を実現するための仕組みで、他にも副作用をもたらす `useEffect` フック、グローバル状態の管理に関わる `useContext` フックなどがあります。本章ではこのうち、`useState` フックについて述べていきます。

フックはコンポーネント内で使用することができます。次の例は、ボタンをクリックするとステートである `count` の値を 1 増やすコンポーネントの例です。

**Counter.tsx**
```tsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  // ボタンクリック時のイベントハンドラ
  const onClickButton = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={onClickButton}>{count}</button>
    </div>
  );
}

```

`useState` フックを用いる場合、JavaScript の分割代入構文を用いて次のように記述します。

```ts
const [状態変数, 状態を更新する関数] = useState<状態の型>(初期値);
```

上記の例では、状態変数が `count`、状態を更新する関数が `setCount`、状態の型が `number`、そして初期値が `0` に該当しています。ボタンをクリックすることで、イベントハンドラである `onClickButton` が呼び出され、その内部の `setCount` の呼び出しによって状態が更新されています。

初期値はこのコンポーネントが初めてレンダリングされる場合に使用される値であり、2 回目以降の読み込み時には更新された状態変数が利用されます。

ところで、状態を変更するための関数の引数の型 `SetStateAction` は次のようなものです。

```ts
// T は状態の型
type SetStateAction<T> = T | (previousValue: T) => T;
```

即ち、**引数には状態の型 T、または型 T を引数に取って型 T を返す関数を取る**ことができます。とりわけ**後者の関数型の引数は更新前の値が入っており、これを基に次の値を計算することができ**ます。

## 5.2 演習 1
5.1 で示したプログラムに次のような行があります。

```ts
setCount((previousCount) => previousCount + 1);
```

ここの記述を次のようなプログラムに変更してその挙動を確かめてみましょう。状態をインクリメントするという意味では変わりありませんが、正しく表示は更新されたでしょうか。

```ts
count++;
```

この結果から分かるように、**状態変数を更新しても状態が更新されることはありません**。状態を更新する関数を通すことで、React 内部の仕組みによって状態が更新され、正しい結果が得られるようになります。

## 5.2 状態に配列やオブジェクトを用いる
次のプログラムは、ボタンをクリックすると入力された名前が順に表示されるコンポーネントの例です。

**Names.tsx**
```tsx
import { useState } from "react";

export default function Names() {
  const [name, setName] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  // ボタンがクリックされた時のイベントハンドラ
  const onClickButton = () => {
    names.push(name);
    setNames(names);
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={onClickButton}>名前を追加</button>
      <p>{names.join(", ")}</p>
    </div>
  );
}
```

このプログラムは正しく動作するでしょうか。

答えは no です。状態の更新による再レンダリング（状態を反映して再度コンポーネントを描画すること）は、**状態設定関数の引数に渡されたオブジェクトと更新前の状態のオブジェクトが等しいかどうかを `Object.is` 関数によって比較された結果が `false` の場合に発生**します。

`onClickButton` 関数の内部では、更新前の状態 `names` の末尾に新しい値を追加して、その配列を `setNames` に渡しています。配列の末尾への値の追加は値の更新とはみなされないので、今回は描画が更新されませんでした。

少し難しいですが、なぜ更新とみなされないのかを考えてみましょう。配列やオブジェクトなどの型は**参照型**と呼ばれ、**変数の実体はその値が格納されているメモリの先頭のアドレス**、即ちポインタです。対して、数値や真偽値などは実際の値が変数に格納されています。

変数 `names` は配列なので、それが指すものはポインタです。この `names` に値を追加したとき、ランタイムは新しいメモリを確保（アロケーション）するのではなく、**メモリ上に配列として既に連なっているデータ群の末尾に値を置くだけなので、この配列の先頭のポインタは変化しません。**

従って、更新前と更新後の `names` の指す値は等しくなり、再レンダリングが走ることはないのです。

この問題を解決するためには、スプレッド構文（`[...array]`）などを用いて新しい配列を作成してあげることが有効です。`onClickButton` 関数内部の 2 行のコードを次のコードに置き換えましょう。

```ts
setNames((previousNames) => [...previousNames, name]);
```

これで問題が解決しました。オブジェクトに対しても同様の操作を施すことでこの問題を回避することができます。

## 5.3 演習
1. `src/components/CreateTweet.tsx` を作成し、一つの `textarea`（ツイート内容用）と一つの `input`（名前用）、一つの `button` を 一つの `div` で囲んだコンポーネントを作成して下さい。
2. `button` 要素の値の記述を変更し、`textarea` に入力された文字数が 0 字以上 140 字以下であれば「ツイート」と、そうでなければ「送信できません」と表示されるようにプログラムを変更して下さい。
3. props として `onSubmitTweet` 関数を受け取り、`onSubmitTweet` 関数は引数に名前とツイート内容をとるようにして下さい。また、ツイートボタンがクリックされたときに `onSubmitTweet` 関数が実行されるようにして下さい。
4. `App.tsx` で作成した `CreateTweet` コンポーネントを呼び出し、表示を確認して下さい。

<details>
    <summary>ヒント</summary>
    <ul>
        <li>要素の値には式を記述することができます。</li>
        <li>入力されている名前と入力されているツイート内容用の 2 つの状態が必要です。</li>
        <li>コンポーネント内にイベントリスナとなる関数を一つ定義し、textarea の onChange にその関数を渡します。コンポーネントの実態は関数なので、内部では通常の関数同様の記述をすることができます。5.2 節の例や、day1/phase3/handouts/8-関数/8.3 アロー関数、 8.4 高階関数 などの章が参考になるはずです。</li>
        <li>props の型宣言は次のようになるはずです。</li>
        <pre>
type Props = {
    onSubmitTweet: (name: string, text: string) => void;
}
        </pre>
    </ul>
</details>