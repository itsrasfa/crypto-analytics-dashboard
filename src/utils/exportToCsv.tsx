export function exportToCsv(filename: string, rows: any[]) {
  if (!rows || !rows.length) return;

  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(',') +
    '\n' +
    rows
      .map((row) =>
        keys
          .map((k) => {
            let cell = row[k] ?? '';
            if (typeof cell === 'string') {
              cell = cell.replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
            }
            return cell;
          })
          .join(','),
      )
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  URL.revokeObjectURL(url);
}
