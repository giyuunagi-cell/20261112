// 宣告用來儲存整張圖片精靈（Sprite Sheet）的變數
let spriteSheet;
// 設定圖片精靈內的總影格數量為 10 張
const totalFrames = 10;
// 設定整張圖片精靈的原始總寬度為 1385 像素
const sheetWidth = 1385;
// 設定整張圖片精靈的原始總高度為 212 像素
const sheetHeight = 212;
// 計算單一影格的原始寬度（總寬度除以 10 張，結果為 138.5）
const frameWidth = sheetWidth / totalFrames;
// 單一影格的原始高度等於整張圖片的高度（212）
const frameHeight = sheetHeight;
// 宣告目前播放到第幾張影格的索引變數，從第 0 張開始
let currentFrame = 0;

// preload 函式會在 setup 執行前先載入外部資源，確保圖片載入完成才開始繪圖
function preload() {
  // 載入位於 1/stop/stop.png 路徑的角色1圖片精靈檔案
  spriteSheet = loadImage('1/stop/stop.png');
}

// setup 函式在程式啟動時只會執行一次，用來初始化畫布與基本設定
function setup() {
  // 建立一個符合目前瀏覽器視窗寬高的全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 設定動畫播放的影格速率（FPS），每秒更新 12 次讓動作流暢自然
  frameRate(12);
}

// draw 函式會不斷重複執行，用來繪製每一幀的畫面內容
function draw() {
  // 設定畫布背景顏色為天空藍（RGB 色碼：135, 206, 235）
  background(135, 206, 235);

  // 計算角色1在畫布上顯示的高度，設定為整個畫布高度的 1/3
  let displayHeight = height / 3;
  // 計算縮放比率：將「播放出來的高度」除以「原圖高度」
  let scaleRatio = displayHeight / frameHeight;
  // 依照計算出的縮放比率，等比例推算出角色1播放出來的寬度
  let displayWidth = frameWidth * scaleRatio;

  // 計算目前影格在原始圖片精靈中的 X 軸裁切起點
  let srcX = currentFrame * frameWidth;
  // 原始圖片只有一橫列，因此 Y 軸裁切起點固定為 0
  let srcY = 0;

  // 計算角色1在畫布上的 X 軸位置：中心點對齊整個畫布寬度的 2/3 處
  let posX = width * (2 / 3) - displayWidth / 2;
  // 計算角色1在畫布上的 Y 軸位置：畫布總高度減去角色顯示高度，讓角色最底端緊貼畫布最底端
  let posY = height - displayHeight;

  // 使用 image() 裁切並繪製目前影格到畫布指定位置與縮放大小
  // 參數依序為：(圖片來源, 畫布X, 畫布Y, 顯示寬, 顯示高, 裁切起點X, 裁切起點Y, 裁切寬, 裁切高)
  image(spriteSheet, posX, posY, displayWidth, displayHeight, srcX, srcY, frameWidth, frameHeight);

  // 將影格索引加 1，並透過取餘數（%）讓索引在 0 到 9 之間循環播放
  currentFrame = (currentFrame + 1) % totalFrames;
}

// windowResized 函式會在瀏覽器視窗大小改變或切換不同載具螢幕時自動觸發
function windowResized() {
  // 重新調整畫布尺寸以符合最新的視窗寬度與高度，確保全螢幕自適應效果
  resizeCanvas(windowWidth, windowHeight);
}