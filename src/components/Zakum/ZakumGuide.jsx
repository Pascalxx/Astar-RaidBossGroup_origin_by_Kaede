import React from 'react';

const ZakumGuide = ({ onViewChange }) => {
    const ZAKUM_DOC_EMBED = "https://docs.google.com/document/d/19iRUhl0Es049i5dgVkJlBAuDK3icESjuEqmAGj44cHs/preview";

    return (
        <div className="container py-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="mb-0">🗿 殘暴炎魔攻略（Zakum Guide）</h3>
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => onViewChange('home')}
                >
                    ← 返回角色清單
                </button>
            </div>

            <div className="card shadow-sm mb-3">
                <div className="card-body">
                    <h5 className="card-title mb-2">官方攻略文件（內嵌）</h5>
                    <div className="ratio ratio-16x9">
                        <iframe
                            src={ZAKUM_DOC_EMBED}
                            title="Zakum Guide Doc"
                            allowFullScreen
                            style={{ border: 0 }}
                        ></iframe>
                    </div>
                    <small className="text-muted d-block mt-2">
                        若未顯示，請確認 Google 文件已「發佈到網路」或權限設定允許內嵌。
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ZakumGuide;
