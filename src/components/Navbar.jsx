import React from 'react';

const Navbar = ({ toggleTheme, isDarkMode, currentView, onViewChange }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top">
      <div className="container-fluid">
        <span className="navbar-brand btn-sm title" style={{ fontSize: '1.25rem' }}>🍁MapleStory Astar公會專屬網站🍁-1423</span>
        <div className="ms-auto d-flex align-items-center gap-2">
          {/* 預留 sourceBadge */}
          <span id="sourceBadge" className="badge bg-light text-dark status-badge d-none"></span>

          <button
            className="btn btn-outline-light btn-sm title"
            onClick={() => onViewChange('home')}
          >
            👨‍👩‍👧‍👦 公會小夥伴
          </button>

          <button
            className="btn btn-outline-light btn-sm title"
            onClick={() => onViewChange('guide')}
          >
            🚀 遊戲攻略
          </button>

          <a href="https://www.artalemaplestory.com/" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm title" title="楓之谷圖鑑">
            🍁 楓之谷圖鑑
          </a>

          <a href="https://artale-market.org/" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm title" title="第三方交易平台">
            🏪 第三方交易平台
          </a>

          <a href="https://a2983456456.github.io/artale-drop/" target="_blank" rel="noopener noreferrer"
            className="btn btn-outline-light btn-sm title" title="怪物掉落物查詢工具">
            👾 怪物掉落物查詢工具
          </a>

          <button
            className="btn btn-outline-light btn-sm title"
            onClick={toggleTheme}
          >
            {isDarkMode ? '🌙 夜間模式' : '☀️ 日間模式'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
