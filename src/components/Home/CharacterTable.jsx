import React from 'react';

// 中文數字排序輔助函式
const mapCN = { '零': 0, '〇': 0, '一': 1, '二': 2, '兩': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10 };

function chineseNumToInt(txt) {
  if (!txt) return NaN;
  const m = txt.match(/[零〇一二兩三四五六七八九十]/g);
  if (!m) return NaN;
  const s = m.join('');
  if (s === '十') return 10;
  const tenIdx = s.indexOf('十');
  if (tenIdx === -1) return mapCN[s] ?? NaN;
  const left = tenIdx === 0 ? 1 : (mapCN[s[0]] ?? 0);
  const right = tenIdx === s.length - 1 ? 0 : (mapCN[s[tenIdx + 1]] ?? 0);
  return left * 10 + right;
}

const CharacterTable = ({ data, currentTab, loading, onEdit }) => {
  if (loading) {
    return <div className="text-center py-4 text-muted">讀取中...</div>;
  }

  const zhNums = '一二三四五六七八九十';
  const reLatus = new RegExp(`^普拉[${zhNums}]營$`);
  const reLatusHard = new RegExp(`^困拉[${zhNums}]營$`);
  const reZakum = new RegExp(`^炎魔[${zhNums}]營$`);

  // 過濾資料
  const filtered = data.filter(r => {
    const camp = (r.camp || '').trim();
    if (currentTab === 'latus') return reLatus.test(camp);
    if (currentTab === 'latushard') return reLatusHard.test(camp);
    if (currentTab === 'zakum') return reZakum.test(camp);
    if (currentTab === 'trainext') return (camp === '訓練營' || camp === '外援大大');
    return true;
  });

  if (filtered.length === 0) {
    return <div className="text-center py-4 text-muted">此分頁下沒有符合的資料</div>;
  }

  // 分組
  const groups = {};
  for (const r of filtered) {
    const key = (r.camp || '未填寫').toString().trim();
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }

  // 排序鍵值
  const orderedKeys = Object.keys(groups).sort((a, b) => {
    const na = chineseNumToInt(a);
    const nb = chineseNumToInt(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.localeCompare(b, 'zh-Hant');
  });

  const groupNotes = {
    '普拉一營': '🔰歐皇指定席🎗️',
    '普拉二營': '🔰瑞氣千條團💎',
    '普拉三營': '🔰馬到成功團🐎',
    '普拉四營': '🔰傳奇空殼團🥥',
    '普拉五營': '🔰祖宗保佑我⛩️',
    '普拉六營': '🔰拉圖娛樂城🎰',
    '普拉七營': '🔰非洲畢業班🗿',
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle reset-content">
        <thead className="table-secondary">
          <tr>
            <th style={{ width: '20%' }}>角色名稱</th>
            <th style={{ width: '10%' }}>角色代碼</th>
            <th style={{ width: '20%' }}>角色職業</th>
            <th style={{ width: '10%' }}>角色等級</th>
            <th style={{ width: '10%' }}>角色乾表</th>
            <th style={{ width: '20%' }}>所在營區</th>
            <th style={{ width: '10%' }}>修改資料</th>
          </tr>
        </thead>
        <tbody>
          {orderedKeys.map(groupKey => (
            <React.Fragment key={groupKey}>
              <tr className="group-row" style={{ background: 'rgba(0, 0, 0, .03)', fontWeight: 600 }}>
                <td colSpan="7">
                  所在營區：{groupKey}
                  {groupNotes[groupKey] ? `　${groupNotes[groupKey]}` : ''}
                  （{groups[groupKey].length}）
                </td>
              </tr>
              {groups[groupKey].map((r, idx) => (
                <tr key={`${r.code}-${idx}`}>
                  <td>{r.name}</td>
                  <td>{r.code}</td>
                  <td>{r.job}</td>
                  <td>{r.level}</td>
                  <td>{r.attack}</td>
                  <td>{r.camp}</td>
                  <td>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => onEdit(r)}
                    >
                      修改
                    </button>
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

export default CharacterTable;
