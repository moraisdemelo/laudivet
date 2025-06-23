document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnPdf').addEventListener('click', gerarPDF);
  document.getElementById('btnShare').addEventListener('click', sharePDF);
});

async function gerarPDF() {
  const { pdfContent, jsPDF } = preparePDF();
  const canvas = await html2canvas(pdfContent, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
  pdf.save('receituario.pdf');
}

async function sharePDF() {
  const { pdfContent, jsPDF } = preparePDF();
  const canvas = await html2canvas(pdfContent, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);

  const blob = pdf.output('blob');
  const file = new File([blob], 'receituario.pdf', { type: 'application/pdf' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({ files: [file], title: 'Receituário LaudiVet' });
  } else {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receituario.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }
}

function preparePDF() {
  const tutor = document.getElementById('tutorInput').value;
  const animal = document.getElementById('animalInput').value;
  const prescricao = document.getElementById('prescricaoInput').value;
  const recomendacoes = document.getElementById('recomendacoesInput').value;
  const data = new Date().toLocaleDateString('pt-BR');

  document.getElementById('tutorField').textContent = tutor;
  document.getElementById('animalField').textContent = animal;
  document.getElementById('prescricaoField').textContent = prescricao;
  document.getElementById('recomendacoesField').textContent = recomendacoes;
  document.getElementById('dataField').textContent = data;

  const pdfContent = document.getElementById('pdfContent');
  pdfContent.style.display = 'block';
  return { pdfContent, jsPDF: window.jspdf.jsPDF };
}