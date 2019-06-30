# [107-2] Web Programming Final Project

### (Group 37) - pdf online discussion

### 一句話描述這個服務在做什麼

-   這是一個可以讓人上傳 pdf 並互相以螢幕錄影的方式分享討論的網站

### 安裝/使用/操作方式 (含伺服器端以及使用者端)

-   Download
    `git clone https://github.com/WU-Five/Web_final.git`
-   Install
    `npm install`
    `cd client && npm install`
-   Run
    `npm run dev`

-   操作
-   1.右上角可以註冊登入
-   2.登入後有SelfRoom和PublicRoom
-   3.SelfRoom可以上傳pdf檔
-   4.PublicRoom可以看到所有人的上傳pdf檔，並可點選進入查看
-   5.查看檔案室左邊可以選擇提問或是發註釋
-   6.回答提問或發註釋都可選擇使用文字或是螢幕錄影的方式

### 使用與參考之框架/模組/原始碼

-   前端

    -   react-pdf
    -   boostrap
    -   axios
    -   react-dplayer
    -   recordrtc

-   後端
    -   express
    -   mongoose
    -   multer

### 組員貢獻

-   **伍兆千:** 負責前後端連結，前端架構部分 css 和 pdf 的儲存及讀取
-   **李冠勳:** 負責前後端連結，前端部分 css 和影片的擷取、儲存及讀取
-   **吳軍霆:** 負責多數的 css 美化、排版等等

### 專題製作心得

-   **伍兆千**
    這一次算是第一次真的有自己從頭到尾的去完成一個有前後端的網站，期中的時候自己只是很匆忙地隨便 clone 了一個人的 repo，然後也沒辦法很好的去理解並去良好的更改，這次這樣從頭到尾的去做終於是讓我能對於前後端的>一些運作關係和寫 code 的手法有了比較實質上的進步，滿開心的。
-   **李冠勳**
    期中時，完全參考別人的框架去改寫。但是到期末，跟組員合作後就一起建構了這個 project，從對 router 不太熟悉到把前後端完成的串連起來發了不少時間，也做了不少的 error handle 讓網頁不會當掉。此外，用影片也花了相當多的時間，要取得各個用戶的裝置然後錄影傳給 server 存檔等等，最後，經過這個 project，我可以確定已經摸熟了 web 大架構的運作了。
-   **吳軍霆**
    這次期末兩個學長都超級強大，我看到了很多很厲害的寫法與邏輯，試著去理解去加入去做一些自己能力夠的部分，從剛開始的不熟悉，到慢慢由style的過程中去了解學長前後端的連結以及架構，不過這次很深刻的體會了各種CSS的功能，各式各樣很fancy的外觀等等，同時也花了不少時間在研究reactstrap這個套件的各種物件的各自所能夠加上去的東西，學到很多東西。


### Demo影片連結
-   https://www.youtube.com/watch?v=Cyoa7Sz_9DY&feature=youtu.be&    fbclid=IwAR2OX47jmWTFkVVcQP1xVUITN088njpyopZLIZQ1CF34HEZ9BbcvId0uK2k


### Github連結
-   https://github.com/WU-Five/Web_final