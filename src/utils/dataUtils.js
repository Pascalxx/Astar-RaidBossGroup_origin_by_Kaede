import Papa from 'papaparse';

export const loadFromSheet = (sheetId, gid = '0') => {
  return new Promise((resolve, reject) => {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

    Papa.parse(csvUrl, {
      download: true,
      skipEmptyLines: true,
      complete: function (result) {
        if (!result.data || result.data.length < 2) {
          resolve([]);
          return;
        }
        // 跳過標題列
        const rows = result.data.slice(1);
        const parsedData = rows
          .map((r, i) => ({
            name: r[1],  // B
            code: r[2],  // C
            job: r[3],   // D
            level: r[4], // E
            attack: r[6],// F
            camp: r[9],  // G
            rowIndex: i + 2
          }))
          .filter(r => r && r.name);
        resolve(parsedData);
      },
      error: function (err) {
        reject(err);
      }
    });
  });
};
