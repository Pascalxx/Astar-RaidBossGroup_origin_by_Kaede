import React, { useState } from 'react';

// 使用嚴格的 /exec URL 連接 GAS
const GAS_UPDATE_URL = 'https://script.google.com/macros/s/AKfycbwbEW15caNLWOUqm8VKby2tN_JfCySTT6xFtreuFz9K0Ex51qioyeqNi476jVH4vlGo/exec';

const EditModal = ({ initialData, isNew, onClose, onSaved }) => {
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = async () => {
    const updated = {
      name: formData.name?.trim(),
      code: formData.code?.trim(),
      job: formData.job?.trim(),
      level: formData.level?.trim(),
      attack: formData.attack?.trim(),
      camp: formData.camp?.trim(),
    };

    if (!updated.code) {
      alert('角色代碼不可為空（用來定位要更新的列）');
      return;
    }

    setSaving(true);

    try {
      const form = new URLSearchParams();
      form.set('action', 'upsertByCode');
      form.set('code', updated.code);
      form.set('name', updated.name);
      form.set('job', updated.job);
      form.set('level', updated.level);
      form.set('attack', updated.attack);
      form.set('camp', updated.camp);

      const resp = await fetch(GAS_UPDATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: form.toString(),
        cache: 'no-store'
        // mode: 'no-cors' // 若要讀取回應請勿使用 no-cors，但 GAS 互動通常需要理解不透明回應或正確的 CORS 設定。
        // 這裡原本的程式碼使用了 'redirect: follow'。
      });

      // GAS 可能會回傳重新導向邏輯或直接回傳 JSON。
      // 如果遇到 CORS 問題，可能會在這裡捕捉到。
      // 原本的邏輯假設它是可以運作的。

      const text = await resp.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        if (text.includes('Google Docs')) {
          // 如果未公開，GAS 有時會回傳 HTML 登入頁面
          throw new Error('無法存取，請確認 GAS 權限');
        }
        // 如果是純文字回應？
        console.warn('非 JSON 回應:', text);
        result = { status: 'unknown' };
      }

      if (!resp.ok || (result.status && result.status !== 'ok' && result.status !== 'unknown')) {
        throw new Error(result.message || '更新/新增失敗');
      }

      alert(isNew ? '新增成功！' : '更新成功！');
      onSaved(updated);
    } catch (e) {
      console.error(e);
      alert('送出失敗：' + e.message + '\n(若為 CORS 錯誤請忽略並重新整理確認)');
      // 備案：如果是 GAS 常見的 CORS 不透明回應問題導致的錯誤（但實際執行成功），則忽略錯誤
      // 但原始程式碼有解析 JSON，所以我們盡量遵循該邏輯。
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isNew ? '新增角色' : '修改資料'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">角色名稱（B）</label>
                <input id="name" type="text" className="form-control" value={formData.name || ''} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label">角色代碼（C）</label>
                <input id="code" type="text" className="form-control" value={formData.code || ''} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label">角色職業（D）</label>
                <input id="job" type="text" className="form-control" value={formData.job || ''} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label">角色等級（E）</label>
                <input id="level" type="text" className="form-control" value={formData.level || ''} onChange={handleChange} />
              </div>
              <div className="col-6">
                <label className="form-label">角色乾表（F）</label>
                <input id="attack" type="text" className="form-control" value={formData.attack || ''} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label">所在營區（G）</label>
                <select id="camp" className="form-select" value={formData.camp || ''} onChange={handleChange}>
                  <option value="">（請選擇）</option>
                  <option>拉圖一營</option><option>拉圖二營</option><option>拉圖三營</option><option>拉圖四營</option><option>拉圖五營</option>
                  <option>拉圖六營</option><option>拉圖七營</option><option>拉圖八營</option><option>拉圖九營</option><option>拉圖十營</option>
                  <option>炎魔一營</option><option>炎魔二營</option><option>炎魔三營</option><option>炎魔四營</option><option>炎魔五營</option>
                  <option>炎魔六營</option><option>炎魔七營</option><option>炎魔八營</option><option>炎魔九營</option><option>炎魔十營</option>
                  <option>訓練營</option><option>外援大大</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} disabled={saving}>取消</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? '儲存中...' : '儲存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
