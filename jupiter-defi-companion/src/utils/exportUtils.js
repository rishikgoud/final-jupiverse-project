import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportCSV = (solBalance, solPrice, tokens) => {
  const rows = [
    ["Token", "Balance", "Price", "Value"],
    ["SOL", solBalance.toFixed(4), solPrice.toFixed(4), (solBalance * solPrice).toFixed(2)],
    ...tokens.map(t => [
      t.symbol,
      t.balanceUi.toFixed(4),
      t.price.toFixed(4),
      t.value.toFixed(2)
    ])
  ];
  const csvContent = rows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "portfolio.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportPDF = (solBalance, solPrice, tokens, customThresholds, totalValue) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Portfolio Snapshot", 14, 20);
  doc.setFontSize(12);
  doc.text(`Total Value: $${totalValue.toFixed(2)}`, 14, 30);
  doc.text(`Assets: ${tokens.length + 1} (including SOL)`, 14, 36);

  const tableRows = [
    ["SOL", solBalance.toFixed(4), `$${solPrice.toFixed(4)}`, `$${(solBalance * solPrice).toFixed(2)}`],
    ...tokens.map(t => [
      t.symbol,
      t.balanceUi.toFixed(4),
      `$${t.price.toFixed(4)}`,
      `$${t.value.toFixed(2)}`
    ])
  ];

  autoTable(doc, {
    head: [['Token', 'Balance', 'Price', 'Value']],
    body: tableRows,
    startY: 45
  });

  const finalY = doc.lastAutoTable.finalY || 45;
  doc.text("Price Alerts:", 14, finalY + 10);
  Object.entries(customThresholds).forEach(([symbol, threshold], i) => {
    doc.text(`${symbol}: $${threshold}`, 14, finalY + 16 + (i * 6));
  });

  doc.save('portfolio.pdf');
};
