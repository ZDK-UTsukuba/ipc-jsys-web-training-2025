---
title: "1 - はじめに"
---

React（リアクト）は Web ブラウザなどで複雑なユーザインタフェース（UI）を構築する際に使用されるライブラリで、**コンポーネント**と呼ばれる部品を用いて UI を実装することが特徴です。似たようなライブラリには Vue などがあります。これらはどちらもコンポーネント単位で UI を構築できるライブラリであるという点では共通しますが、データの流れ方（React が**単方向データバインディング** = UI 上でのインタラクションがイベントハンドラによって捕捉され、明示的に更新処理をする であるのに対し、Vue は**双方向データバインディング** = UI 上でのインタラクションがデータへ自動反映され、明示的な更新を必要としない）やプログラムの記述方法（関数ベース vs クラスベース）などの点で異なります。

百聞は一見に如かず、まずは React のコードを眺めてみましょう。次のコードは TSX と呼ばれる TypeScript の拡張構文（後述）で記述された UI コンポーネントです。

```tsx
type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail(props: Props) {
    return (
        <div className='thumbnail'>
            <img src={props.srcUrl}></img>
            <div className='inner'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
```

![React のサンプル](_images/1_1.png)

このように、TypeScript の中に HTML がシームレスに取り込まれた構文によってコンポーネントを定義することができます。