---
title: "8 - CSS"
---

React で CSS を利用するには幾つかの手法があり、考えられる手法を列挙します。

- CSS Modules
  - CSS をモジュール化する
- CSS in JS
  - CSS を JavaScript（TypeScript）コード中に埋め込む
- Sass / SCSS
  - Sass や SCSS と呼ばれる、拡張された CSS によるスタイルの利用
- インラインスタイル
  - `style` 属性に直接値を入れる
- CSS フレームワーク
  - Tailwind CSS などの利用

このうち、本書では CSS Modules と CSS in JS（styled-components）を扱います。

## 8.1 CSS Modules
CSS Modules はモジュール化された CSS で、**`Xxxx.module.css` という名前でファイルを作成**します。通常の CSS では、**全てのクラス名などがグローバルの名前空間に作成される**ため、プロジェクトの規模が大きくなるとクラス名が衝突しやすくなります。一方で CSS Modules では、**コンポーネント単位で CSS がカプセル化され、自動的に一意のクラス名が生成されるために名前の衝突が起こることがありません**。

また、異なるコンポーネント間でスタイルを再利用することができるため、保守性を向上させることが可能です。次で例を見てみましょう。

**Thumbnail.module.css**
```css
.thumbnail {
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  border-radius: 12px;
  gap: 32px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
}

/* 続く... */
```

**Thumbnail.tsx**
```tsx
// インポートする
import './Thumbnail.css';

type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail({ srcUrl, title, description }: Props) {
    return (
        <div className='thumbnail'>
        <img src={srcUrl}></img>
        <div className='inner'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
}
```

このように、TSX ファイル側で使用したい CSS Modules をインポートしてあげる必要があります。今回は TSX ファイルと CSS Modules の名前が一致していますが、一致していなくても問題はありません。**インポートした CSS Modules に定義されたクラス名を `className` 属性に渡すことにでスタイルを当てられます**。

## 8.2 CSS in JS - styled-components
CSS in JS とは**プログラム中に埋め込まれた CSS によって予めスタイルがあてられたコンポーネントを作成する**手法で、**styled-components** などのライブラリを導入することによって利用できます。

### 8.2.1 導入
styled-components は次のコマンドを実行して導入できます。

```sh
npm install styled-components
```

### 8.2.2 コンポーネントの定義
例えば Thumbnail 同様のコンポーネントを styled-components を利用して作成する場合には、次のように記述します。

**Thumbnail2.tsx**
```tsx
import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  border-radius: 12px;
  gap: 32px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);

  & > img {
    width: 130px;
  }
`;

const Title = styled.h2`
  font-size: 1em;
  color: #333;
  margin: 0;
  text-align: left;
`;

const Description = styled.p`
  font-size: 0.8em;
  text-align: left;
  margin: 12px 0 0;
`;

type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail2({ srcUrl, title, description }: Props) {
    return (
      <Wrapper>
        <img src={srcUrl}></img>
        <div>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
      </Wrapper>
    );
}
```

`styled` として `styled-components` をインポートし、各コンポーネントを `styled.タグ名` の記述によって生成します。その後にテンプレートリテラル（バッククオートによって囲まれた文字列）の中に CSS を記述することでそのコンポーネントにスタイルがあたります。

styled-components 独特の記法として `&` があります。`&` は自身の要素を指す特殊な変数で、例えば「自身の直下の `img` 要素」を指定するような時に `& > img {}` という構文を使用できます。

### 8.2.3 動的なスタイルの変更
`styled.タグ名` によってコンポーネントを定義する際、バッククオートとの間にジェネリクス（`<型名>`）を与えることによって、このコンポーネントに引数を与えることができます。この機能を用いることで、例えば「入力値が 100 以下だったら文字を赤にする」などの処理を簡単に行うことができます。以下で例を見てみましょう。

**InputNumber.tsx**
```tsx
import { useState } from "react";
import styled from "styled-components";

// LabelPropsの型を定義
type LabelProps = {
  isError: boolean;
};

// LabelPropsを props に持つLabelコンポーネントを定義 
// LabelPropsのisErrorがtrueの場合は文字色を赤にする
const Label = styled.label<LabelProps>`
  color: ${(props) => (props.isError ? "red" : "black")};
`;

export default function InputNumber() {
  const [value, setValue] = useState<number>(0);

  // inputの値が変更された時に呼び出される関数
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  return (
    <div>
      <Label isError={value <= 100}>
        {value <= 100
          ? "100以上の数字を入力してください"
          : "数字を入力してください"}
      </Label>
      <input type="number" value={value} onChange={onChange}></input>
    </div>
  );
}
```

重要なのは CSS 中の `color: ${(props) => (props.isError ? "red" : "black")};` の部分で、**props を受け取るには CSS の値の部分に props を受け取って文字列を返す関数を記述する必要**があります。

## 8.3 演習
1. 自分のプロジェクトに styled-components を導入してください。
2. CreateTweet コンポーネントの「ツイート」ボタンを styled-components によるものに変更し、ツイート内容が 0 字以上 140 字以下であれば背景色を水色に、そうでなければ灰色にするように修正してください。
3. 余力があれば他の Twitter もどき周りのスタイルにも手を加え、自分好みのデザインにしてください。