import React from 'react';

const Navbar = ({ toggleTheme, isDarkMode, currentView, onViewChange }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container-fluid">
                <span className="navbar-brand">🍁MapleStory Astar公會專屬網站🍁-1347</span>
                <div className="ms-auto d-flex align-items-center gap-2">
                    {/* 預留 sourceBadge */}
                    <span id="sourceBadge" className="badge bg-light text-dark status-badge d-none"></span>

                    <a href="https://docs.google.com/spreadsheets/d/1lPS_dyOfFe04SbmavvqAZT6GVTOuN-F-qSXDhQlpfUY/edit?gid=0#gid=0"
                        target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm" title="全職業攻略">
                        ⚔️ 全職業攻略
                    </a>

                    <a href="https://docs.google.com/document/u/0/d/1fripMi-WrPOh9ZpdAfUlyiUZd42Btt_tIpNohXLLE3A/mobilebasic"
                        target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm" title="全職業技能任務">
                        🧾 全職業技能任務
                    </a>

                    <a href="https://artale-market.org/" target="_blank" rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm" title="第三方交易平台">
                        🏪 第三方交易平台
                    </a>

                    <a href="https://a2983456456.github.io/artale-drop/" target="_blank" rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm" title="怪物掉落物查詢工具">
                        👾 怪物掉落物查詢工具
                    </a>

                    <a href="https://rvgin.github.io/tower-of-goddess/" target="_blank" rel="noopener noreferrer"
                        className="btn btn-outline-light btn-sm" title="女神 400 速解小工具">
                        👸 女神 400 速解小工具
                    </a>

                    <a href="https://philipc-1.github.io/MapleStory/HPsimulator.html" target="_blank"
                        rel="noopener noreferrer" className="btn btn-outline-light btn-sm" title="補品生存模擬器">
                        💊 補品生存模擬器
                    </a>

                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => onViewChange(currentView === 'home' ? 'zakum' : 'home')}
                    >
                        {currentView === 'home' ? '🗿 殘暴炎魔攻略' : '🏠 返回首頁'}
                    </button>

                    <button
                        className="btn btn-outline-light btn-sm"
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
