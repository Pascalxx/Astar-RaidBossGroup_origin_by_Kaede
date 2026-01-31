import React, { useState, useEffect } from 'react';
import { loadFromSheet } from '../../utils/dataUtils';
import CharacterTable from './CharacterTable';
import EditModal from './EditModal'; // Will create next
import StatsModal from './StatsModal'; // Will create next

const DEFAULT_SHEET_ID = '1-j04395CPwDlZnJ2vUt3k4wsT5rPHgQWmujSQCi76Fs';
const DEFAULT_GID = '0';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTab, setCurrentTab] = useState('latus'); // 'latus' | 'zakum' | 'trainext'

  // Modal 狀態
  const [showStats, setShowStats] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // null 表示關閉，物件表示開啟
  const [isNewItem, setIsNewItem] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    loadFromSheet(DEFAULT_SHEET_ID, DEFAULT_GID)
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('讀取失敗，請確認該 Google Sheet 已設為「知道連結的任何人可檢視」。');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsNewItem(false);
  };

  const handleAdd = () => {
    setEditingItem({
      name: '', code: '', job: '', level: '', attack: '', camp: '',
      rowIndex: 0
    });
    setIsNewItem(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h3 className="mb-0"><b>👩‍👩‍👧‍👦 公會小夥伴</b></h3>
      </div>

      {/* 資訊卡片 */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-0">
            <h4 className="card-title mb-2">➡️ 資料來源</h4>
          </div>
          <p className="mb-0 text-muted">請各位檢視一下自己的資料是否須更新，若要更新請點擊【修改】按鈕進行更新。若遇無法更新情形請進以下網址進入Excel表找到自己的欄位更新資料 　～感恩的心～</p>
          <small className="text-muted">
            <a href={`https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET_ID}/edit?gid=${DEFAULT_GID}#gid=${DEFAULT_GID}`}
              target="_blank" rel="noopener noreferrer">
              Google Sheet Link
            </a>
          </small>
          {error && <div className="text-danger mt-2">{error}</div>}
        </div>
      </div>

      {/* 主要內容 */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="card-title mb-2">🏋️ 角色清單</h4>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-primary btn-sm" onClick={handleAdd}>新增角色</button>
              <button className="btn btn-outline-primary btn-sm" onClick={() => setShowStats(true)}>📊 公會職業分佈統計</button>
              <button className="btn btn-outline-secondary btn-sm" onClick={fetchData}>重新整理</button>
            </div>
          </div>

          {/* 分頁標籤 */}
          <ul className="nav nav-pills nav-tabs-custom mb-3">
            <li className="nav-item">
              <button
                className={`nav-link tab-latus ${currentTab === 'latus' ? 'active' : ''}`}
                onClick={() => setCurrentTab('latus')}
              >拉圖斯(普通)</button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link tab-latushard ${currentTab === 'latushard' ? 'active' : ''}`}
                onClick={() => setCurrentTab('latushard')}
              >拉圖斯(困難)</button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link tab-zakum ${currentTab === 'zakum' ? 'active' : ''}`}
                onClick={() => setCurrentTab('zakum')}
              >殘暴炎魔</button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link tab-misc ${currentTab === 'trainext' ? 'active' : ''}`}
                onClick={() => setCurrentTab('trainext')}
              >訓練營&外援專區</button>
            </li>
          </ul>

          {/* 角色列表表格 */}
          <CharacterTable
            data={data}
            currentTab={currentTab}
            loading={loading}
            onEdit={handleEdit}
          />
        </div>
      </div>

      {/* Modals 視窗 */}
      {showStats && <StatsModal data={data} onClose={() => setShowStats(false)} />}
      {editingItem && (
        <EditModal
          initialData={editingItem}
          isNew={isNewItem}
          onClose={() => setEditingItem(null)}
          onSaved={() => {
            setIsNewItem(null);
            fetchData(); // 儲存後重新載入
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
