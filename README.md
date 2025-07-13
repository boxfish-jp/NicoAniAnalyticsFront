# NicoAniAnalyticsFront
ふぐおがサイトの収益化を目指して作ったが、ニコニコがハッキングされたことによってわずか2か月で幕を閉じた、悲しきサイトです。  
バックエンドもフロントエンドもガッツリある、Webアプリはこれが初であり、基礎を学べたので良しとします。  

## 何をやっていた？
ニコニコで放映されているアニメの再生数、コメント数、マイリスト数を収集し、今ニコニコで一番見られているアニメを確認できるサイトでした。  
Webサイトはこちら  
[https://animeini.com/](https://animeini.com/)  

このようにチャンネルごとの平均再生数、コメント数、マイリスト数を基にランキングを作成。  
<img width="600" height="394" alt="image" src="https://github.com/user-attachments/assets/c0ffa63d-487d-43c6-a06b-8d2a7091da23" />

各話の再生数比較や  
<img width="600" height="354" alt="image" src="https://github.com/user-attachments/assets/6ef02a2b-ab1b-4706-ab41-ebb3ec05aff9" />

その動画の日毎の再生数推移などが見れるサイトでした。  
<img width="600" height="325" alt="image" src="https://github.com/user-attachments/assets/b35ebb96-a0b1-4ef1-8bc2-4e23f775d79d" />

## 悲しい事件
運用を本格開始した2024年4月から2か月後の6月に、ニコニコがサイバー攻撃を受けて以降、ニコニコ側の仕様が変わってしまいました。  
それに伴い、ニコニコから情報を取得する仕様がかわってしまい、それ以降対応できておりません。(一応、直したい気持ちはある。)  

## 構成
3つのリポジトリからできています。

### NicoAniAnalytics
https://github.com/boxfish-jp/NicoAniAnalytics  
ニコニコから情報を取得してくるプロセス。  
Firebase Functionsにデプロイしていました。

#### 技術的な小話

動画の情報を取得するAPIを使用する予定でしたが、あまりにもニコニコ側に負荷をかけてしまうので、魔法の力を使って取得しています。
公式APIを使う場合と魔法を使う場合でのニコニコへのリクエスト数の比較は以下の通りです。  
1シーズンあたりのアニメを放映するチャンネル数を60チャンネル、それぞれ12話アニメを放映するとする。(現実はこれ以上多い。)  
- 公式APIの場合: 60チャンネル×12話=720リクエスト
- 魔法の場合: 60チャンネル=60リクエスト

12分の1の負荷になっています。また、魔法は10秒に1回のみ発動するようにしており、ニコニコ側への負荷は細心の注意を払っています。  
さらに、負荷をかけているお詫びとして、私はプレ垢費もかかっています。  
(ニコニコ側の仕様が変わってしまってからは、停止中です。)

### NicoAniHono
https://github.com/boxfish-jp/nicoAniHono  
取得してきた情報を保存しておく、DBのAPIです。  
DBはCloudflare D1,APIのフレームワークとしてHonoを使用しています。  
あまりよく分かっておらず作っているため、かなり拙いです。  

### NicoAniAnalyticsFront
https://github.com/boxfish-jp/NicoAniAnalyticsFront  
このリポジトリです。  
NicoAniHonoからデータを取得してきて、それを表示するフロントエンドです。  
セキュリティーと軽量さにはこだわっており、ランキングページはSSR、動画ページはSSGで表示します。  
Next.js, Tailwind CSS, Shadcnを使っています。
