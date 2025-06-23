window.onload = () => {
  document.getElementById('btnPdf').addEventListener('click', gerarPDF);
};
async function gerarPDF() {
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

  const content = document.getElementById('pdfContent');
  content.style.display = 'block';

  const canvas = await html2canvas(content, { scale: 2, useCORS: true, allowTaint: true });
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
  pdf.save('receituario.pdf');

  content.style.display = 'none';
}
