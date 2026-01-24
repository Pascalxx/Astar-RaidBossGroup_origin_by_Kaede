export const normalizeJob = (raw) => {
  if (!raw) return '（未填寫）';
  let s = String(raw).trim();

  // 統一標點
  s = s.replace(/，/g, '、');

  // 對照表
  const map = [
    { test: /^(十字軍|英雄)$/, to: '英雄' },
    { test: /^(騎士|聖騎士)$/, to: '聖騎士' },
    { test: /^(龍騎士|黑騎士)$/, to: '黑騎士' },

    { test: /^(火魔導士|大魔導士\(火、毒\))$/, to: '大魔導士(火、毒)' },
    { test: /^(冰魔導士|大魔導士\(冰、雷\))$/, to: '大魔導士(冰、雷)' },

    { test: /^(祭司|主教)$/, to: '主教' },
    { test: /^(遊俠|箭神)$/, to: '箭神' },
    { test: /^(狙擊手|神射手)$/, to: '神射手' },

    { test: /^(暗殺者|夜使者)$/, to: '夜使者' },
    { test: /^(神偷|暗影神偷)$/, to: '暗影神偷' },

    { test: /^(格鬥家|拳霸)$/, to: '拳霸' },
    { test: /^(神槍手|槍神)$/, to: '槍神' },

    { test: /^初新者$/, to: '初新者' }
  ];

  for (const rule of map) {
    if (rule.test.test(s)) return rule.to;
  }
  return s;
};

export const JOB_COLOR = {
  '英雄': '#FFD24D',
  '聖騎士': '#F5F5F0',
  '黑騎士': '#1F1F1F',

  '大魔導士(火、毒)': '#FF9999',
  '大魔導士(冰、雷)': '#99CCFF',
  '主教': '#FFF3B0',
  '箭神': '#4CAF50',
  '神射手': '#26A69A',

  '夜使者': '#5E35B1',
  '暗影神偷': '#4A4A4A',
  '拳霸': '#D4AF37',
  '槍神': '#E0E0E0',
  '初新者': '#FFFFFF'
};

export const getJobColor = (name) => JOB_COLOR[name] || '#9E9E9E';

export const getJobBorderColor = (name) => {
  const c = (JOB_COLOR[name] || '').toLowerCase();
  if (c === '#ffffff' || c === '#f5f5f0' || c === '#fff3b0' || c === '#ff9999' || c === '#99ccff') {
    return '#333333';
  }
  return '#222222';
};
