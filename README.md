# MapleStory Astar 公會專屬網站 (React Refactor)

這是 **MapleStory Astar 公會專屬網站** 的 React 重構版本。
> 原本網站由 **Kaede** 製作

原專案為單一 HTML 原型，現已遷移至 React + Vite 架構，並使用 GitHub Pages 或其他靜態託管服務進行部署。

## ✨ 功能特色

- **角色清單**：從 Google Sheet (CSV) 動態讀取公會成員資料。
- **分頁篩選**：支援「拉圖斯」、「殘暴炎魔」、「訓練營/外援」等不同營區的快速篩選。
- **職業統計**：提供公會職業分佈的圖表分析 (Chart.js)。
- **資料修改**：整合 Google Apps Script (GAS)，可直接在網頁上新增或修改角色資料。
- **攻略內嵌**：內嵌殘暴炎魔官方攻略文件。
- **夜間模式**：支援深色/淺色主題切換。

## 🛠️ 技術堆疊

- **前端框架**：[React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI 庫**：[Bootstrap 5](https://getbootstrap.com/)
- **圖表**：[Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- **資料處理**：[PapaParse](https://www.papaparse.com/) (CSV 解析)

## 🚀 快速開始

### 1. 安裝依賴

此專案需要 Node.js環境。建議使用 Node.js 20.19+ 或 22.12+ (以符合 Vite 7 需求，若使用 Node 20.14 可能會有警告但仍可運行)。

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```
啟動後請前往 `http://localhost:5173` 查看。

### 3. 建置生產版本

```bash
npm run build
```
打包後的檔案會產生在 `dist` 資料夾中。

## 📂 專案結構

```
Astar-RaidBossGroup_origin_by_Kaede/
├── src/
│   ├── components/         # React 元件
│   │   ├── Guide/          # 遊戲攻略頁面元件
│   │   ├── Home/           # 首頁相關元件 (列表, Modal)
│   │   ├── Zakum/          # 殘暴炎魔攻略元件
│   │   └── Navbar.jsx      # 導覽列
│   ├── utils/              # 工具函式 (資料抓取, 職業顏色定義)
│   ├── App.jsx             # 主應用程式入口
│   └── main.jsx            # 渲染入口
├── public/                 # 靜態資源
└── index.html              # HTML 入口
```

## 📝 注意事項

- **Google Sheet 連動**：本專案依賴 Google Sheet 發佈為 CSV 的功能。若資料無法讀取，請確認 Sheet 的權限設定為「知道連結的任何人可檢視」。
- **GAS API**：資料修改功能依賴 Google Apps Script，若遇到 CORS 問題或無法存取，請確認 GAS 部署權限設定為「任何人 (含匿名使用者)」。

## 📅 更新日誌 (Changelog)

### v2.0 (2026-01-31)
- **新增遊戲攻略頁面 (Game Guide)**：
  - **叔叔一圖流**：支援關鍵字搜尋、分類顯示、點擊圖片預覽。
  - **攻略連結**：整合「全職業攻略」、「全職業四轉技能」、「女神400小工具」、「補品生存模擬器」等實用連結。
  - **內嵌攻略**：「困難拉圖斯」與「殘暴炎魔」攻略文件直接內嵌於分頁中。
- **角色列表優化**：
  - **新增分頁**：支援「拉圖斯(普通)」、「拉圖斯(困難)」、「殘暴炎魔」、「訓練營&外援」快速切換。
  - **分組顯示**：依營區自動分組，並顯示對應的趣味備註（如：歐皇指定席、瑞氣千條團等）。
  - **導覽列更新**：增加常用工具連結（楓之谷圖鑑、第三方交易平台、掉落物查詢）。
