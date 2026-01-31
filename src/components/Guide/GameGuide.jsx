import React, { useState, useEffect } from 'react';
import { loadOnePicData } from '../../utils/dataUtils';

const GameGuide = ({ onViewChange }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [onePicData, setOnePicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // 常數
  const ONE_PIC_SHEET_ID = '1ZFHkpsHKc0LWQDNPrP8Y5NS27aee0mOniK2uB8C2zD4';
  const HARD_LATUS_DOC = "https://docs.google.com/document/d/1UrV2RrEJwLZJ8X5t88GXRuxKbbxp9vq6W2Qeu1nqzV0/preview";
  const ZAKUM_DOC = "https://docs.google.com/document/d/19iRUhl0Es049i5dgVkJlBAuDK3icESjuEqmAGj44cHs/preview";

  useEffect(() => {
    // 當「叔叔一圖流」分頁開啟時讀取資料（或初次載入）
    if (activeTab === 'tab1' && onePicData.length === 0) {
      fetchOnePicData();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(onePicData);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = onePicData.filter(item =>
        (item.category && item.category.toLowerCase().includes(lowerTerm)) ||
        (item.name && item.name.toLowerCase().includes(lowerTerm)) ||
        (item.keyword && item.keyword.toLowerCase().includes(lowerTerm))
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, onePicData]);

  const fetchOnePicData = () => {
    setLoading(true);
    loadOnePicData(ONE_PIC_SHEET_ID)
      .then(data => {
        setOnePicData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("讀取一圖流資料失敗", err);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    // 搜尋功能已在 useEffect 中處理 searchTerm 變更
    // 若須特定邏輯（如按下 Enter 才搜尋），可在此實作
  };

  // 渲染一圖流表格
  const renderOnePicTable = () => {
    if (loading) return <div className="text-center py-4 text-muted">讀取中...</div>;
    if (filteredData.length === 0) return <div className="text-center py-4 text-muted">目前沒有符合的資料</div>;

    // 依分類分組
    const groups = {};
    filteredData.forEach(item => {
      const key = item.category || '未被分類';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle reset-content game-guide-table">
          <thead className="table-secondary">
            <tr>
              <th style={{ width: '20%' }}>分類</th>
              <th style={{ width: '20%' }}>名稱</th>
              <th style={{ width: '25%' }}>關鍵字</th>
              <th style={{ width: '35%' }}>圖片 (點擊開啟大圖)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groups).map((category, idx) => (
              <React.Fragment key={idx}>
                {/* 分組標題 - 比照首頁樣式顯示 */}
                <tr className="group-row">
                  <td colSpan="4">一圖流分類：{category}（{groups[category].length}）</td>
                </tr>
                {groups[category].map((item, i) => (
                  <tr key={i}>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.keyword}</td>
                    <td>
                      {item.link ? (
                        <a href={`https://drive.google.com/file/d/${item.link}/`} target="_blank" rel="noopener noreferrer">
                          <img
                            src={`https://lh3.googleusercontent.com/d/${item.link}=h800?authuser=0`}
                            alt={item.name}
                            title={item.name}
                            style={{ height: '200px' }}
                          />
                        </a>
                      ) : '無圖片'}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const navLinkStyle = (tabId, colorClass) => {
    const isActive = activeTab === tabId;
    let style = {};
    if (isActive) {
      // 啟用狀態樣式
      if (colorClass === 'orange') style = { backgroundColor: '#fd7e14', color: '#fff' };
      if (colorClass === 'purple') style = { backgroundColor: '#6f42c1', color: '#fff' };
      if (colorClass === 'green') style = { backgroundColor: '#198754', color: '#fff' };
    } else {
      // 未啟用文字樣式
      if (colorClass === 'orange') style = { color: '#fd7e14', borderColor: '#fd7e14' };
      if (colorClass === 'purple') style = { color: '#6f42c1', borderColor: '#6f42c1' };
      if (colorClass === 'green') style = { color: '#198754', borderColor: '#198754' };
    }
    return { ...style, cursor: 'pointer', marginBottom: '5px', marginRight: '5px' };
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0"><b>🚀 遊戲攻略（Game Guide）</b></h3>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onViewChange('home')}>
            ← 返回角色清單
          </button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">



          {/* 導航分頁 (自定義樣式) */}
          <div className="d-flex flex-wrap mb-3">

            {/* 分頁 1: 叔叔一圖流 (橘色) */}
            <button
              className={`btn game-guide-tab-btn btn-outline-orange ${activeTab === 'tab1' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab1')}
            >
              叔叔一圖流
            </button>

            {/* 分頁 2: 全職業攻略 (外部連結) */}
            <a
              href="https://docs.google.com/spreadsheets/d/1lPS_dyOfFe04SbmavvqAZT6GVTOuN-F-qSXDhQlpfUY/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary game-guide-tab-btn"
            >
              全職業攻略
            </a>

            {/* 分頁 3: 全職業四轉技能 (外部連結) */}
            <a
              href="https://docs.google.com/document/u/0/d/1fripMi-WrPOh9ZpdAfUlyiUZd42Btt_tIpNohXLLE3A/mobilebasic"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary game-guide-tab-btn"
            >
              全職業四轉技能
            </a>

            {/* 分頁 4: 困難拉圖斯 (紫色) */}
            <button
              className={`btn game-guide-tab-btn btn-outline-purple ${activeTab === 'tab4' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab4')}
            >
              困難拉圖斯
            </button>

            {/* 分頁 5: 殘暴炎魔 (紫色) */}
            <button
              className={`btn game-guide-tab-btn btn-outline-purple ${activeTab === 'tab5' ? 'active' : ''}`}
              onClick={() => setActiveTab('tab5')}
            >
              殘暴炎魔
            </button>

            {/* 分頁 6: 女神400小工具 (綠色) */}
            <a
              href="https://rvgin.github.io/tower-of-goddess/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn game-guide-tab-btn btn-outline-green"
            >
              女神400小工具
            </a>

            {/* 分頁 7: 補品生存模擬器 (綠色) */}
            <a
              href="https://philipc-1.github.io/MapleStory/HPsimulator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn game-guide-tab-btn btn-outline-green"
            >
              補品生存模擬器
            </a>

          </div>

          {/* 內容區塊 */}
          <div className="tab-content">

            {/* 分頁 1 內容 */}
            {activeTab === 'tab1' && (
              <div className="card border-0">
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                  <h4 className="card-title mb-2">🌟 叔叔一圖流</h4>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      name="txt_Search"
                      style={{ minWidth: '200px', display: 'block' }}
                      placeholder="輸入搜尋內容"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleSearch()}>搜尋</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setSearchTerm('')}>重置</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={fetchOnePicData}>重新整理</button>
                  </div>
                </div>
                {renderOnePicTable()}
              </div>
            )}

            {/* 分頁 4 內容 */}
            {activeTab === 'tab4' && (
              <div className="card border-0">
                <h4 className="card-title mb-2">⏰ 困難拉圖斯攻略（Hard Papulatus Guide）</h4>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={HARD_LATUS_DOC}
                    title="Hard Papulatus Guide"
                    allowFullScreen
                    style={{ border: 0 }}
                  ></iframe>
                </div>
                <small className="text-muted d-block mt-2">
                  若未顯示，請確認 Google 文件已「發佈到網路」或權限設定允許內嵌。
                </small>
              </div>
            )}

            {/* 分頁 5 內容 */}
            {activeTab === 'tab5' && (
              <div className="card border-0">
                <h4 className="card-title mb-2">🗿 殘暴炎魔攻略（Zakum Guide）</h4>
                <div className="ratio ratio-16x9">
                  <iframe
                    src={ZAKUM_DOC}
                    title="Zakum Guide"
                    allowFullScreen
                    style={{ border: 0 }}
                  ></iframe>
                </div>
                <small className="text-muted d-block mt-2">
                  若未顯示，請確認 Google 文件已「發佈到網路」或權限設定允許內嵌。
                </small>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default GameGuide;
