# Windows向け環境構築ガイド

このドキュメントでは、Windowsでの環境構築の方法について解説します。

チューターから指示のあったツールをインストールしてください。

## Bun

PowerShell（スタートメニューで「PowerShell」と検索して起動）を開き、次のコマンドを貼り付けて実行します。

```ps
powershell -c "irm bun.sh/install.ps1 | iex"
```

次のような表示になれば成功です。

```
bun was installed successfully to C:\Users\<ユーザー名>\.bun\bin\bun.exe

To get started, add the bun directory to your PATH:
  setx PATH "%PATH%;C:\Users\<ユーザー名>\.bun\bin"

To get started in a new powershell session, run:
  bun --version
```

ターミナルで新しいタブを開いて `bun -v` と入力すると、バージョン情報が表示されるはずです。

```
PS C:\Users\appare45> bun -v
1.3.14
```

## Node.js

Node.jsはJavaScriptをサーバーサイドで実行するためのランタイムである。ここでは **NVM for Windows**（Node Version Manager）を使ってインストールする。NVMを使うと、Node.jsのバージョンを簡単に切り替えられる。

### 1. インストーラのダウンロード

[こちらのリンク](https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe)をクリックしてNVM for Windowsのインストーラ（`nvm-setup.exe`）をダウンロードします。

### 2. インストーラを起動する

ダウンロードした`nvm-setup.exe`をダブルクリックして起動します。次のスクリーンショットの順番に従って進める。

「I accept the agreement」を選択して「Next」をクリックする。

![NVM for Windowsのライセンス同意画面。「I accept the agreement」が選択されている](images/nvm_license.png)

デフォルト（`C:\Users\<ユーザー名>\AppData\Local\nvm`）のまま「Next」をクリック。

![NVMのインストール先ディレクトリ選択画面](images/nvm_install_path.png)

デフォルトのまま「Next」をクリック

![NVMが管理するNode.jsのシンボリックリンク先パス選択画面](images/nvm_symlink_path.png)

すべてのチェックを外して「Next」をクリックする。

![NVMのデスクトップ通知設定画面。チェックボックスがすべてオフになっている](images/nvm_notifications.png)

空欄のまま「Next」をクリックする。

![NVM作者へのメールアドレス登録画面。入力欄は空欄のまま](images/nvm_email.png)

Install」をクリックしてインストールを開始する。

![NVMのインストール準備完了確認画面](images/nvm_ready.png)

「Finish」をクリックする。

![NVMセットアップウィザード完了画面。「Open with Powershell」がチェックされている](images/nvm_complete.png)

Windows PowerShellが自動的に起動し、「Welcome to NVM for Windows v1.2.2」と表示されたら成功です。

![PowerShellに「Welcome to NVM for Windows v1.2.2」と表示されたインストール完了画面](images/nvm_welcome.png)

### 3. Node.jsをインストールする

PowerShellを一度閉じてから再度起動し、次のコマンドを順番に実行します。

```ps
nvm install lts
nvm use lts
node --version
```

最後に `v24.16.0` のようなバージョン番号が表示されれば成功です。

```
PS C:\WINDOWS\system32> nvm install lts
Downloading node.js version 24.16.0 (64-bit)...
Extracting node and npm...
Complete
Installation complete.
If you want to use this version, type:

nvm use 24.16.0
PS C:\WINDOWS\system32> nvm use lts
Now using node v24.16.0 (64-bit)
PS C:\WINDOWS\system32> node --version
v24.16.0
```

## Docker

### 1. WSLのインストール

PowerShellを起動して次のコマンドを実行します。

```ps
wsl --install
```

インストールが完了すると次のように表示されます。ユーザー名とパスワードの入力を求められるので好きなユーザー名とパスワードを設定します。

![PowerShellでwsl --installコマンドを実行し、UbuntuのWSLインストールが完了した画面](images/wsl_install.png)

インストール後、次のコマンドでWSLのバージョンを確認します。

```ps
wsl --version
```

以下のように表示されれば正常にインストールされています。

```
PS C:\WINDOWS\system32> wsl --version
WSL バージョン: 2.7.3.0
カーネル バージョン: 6.6.114.1-1
WSLg バージョン: 1.0.73
MSRDC バージョン: 1.2.6676
Direct3D バージョン: 1.611.1-81528511
DXCore バージョン: 10.0.26100.1-240331-1435.ge-release
Windows バージョン: 10.0.26200.8457
```

### 2. Docker Desktopのインストール

[このリンク](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)からDocker Desktopのインストーラをダウンロードします。

ダウンロードしたインストーラを起動すると設定画面が表示されるので、デフォルトのまま「OK」をクリックする。

![Docker Desktopインストーラの設定画面。「All-users installation」が選択されOKボタンが示されている](images/docker_config.png)

インストールが完了したら「Close and restart」をクリックしてPCを再起動します。

![Docker Desktop 4.75.0のインストール完了画面。「Close and restart」ボタンが示されている](images/docker_install_complete.png)

### 3. Docker Desktopの初期設定

再起動後、Docker Desktopを起動します。利用規約（Docker Subscription Service Agreement）が表示されたら「Accept」をクリックします。

![Docker Desktop利用規約（Docker Subscription Service Agreement）の同意画面。「Accept」ボタンが示されている](images/docker_agreement.png)

「Welcome to Docker」画面が表示されたら、右上の「Skip」をクリックして先に進みます（アカウントは不要）。

![Docker Desktopの「Welcome to Docker」サインイン画面。右上にSkipボタンがある](images/docker_welcome.png)

### 4. 動作確認

Docker Desktopのダッシュボードが表示され、左下に「Engine running」と表示されれば正常に起動しています（少し時間がかかります）。

![Docker Desktopのダッシュボード画面。左下に「Engine running」と表示されDockerが正常に起動している](images/docker_dashboard.png)
