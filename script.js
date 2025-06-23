let qr;
function generateQR() {
  const ssid = document.getElementById('ssid').value;
  const pass = document.getElementById('password').value;
  const security = document.getElementById('security').value;
  const logoInput = document.getElementById('logoInput');

  if (!ssid) return alert("Please enter SSID");

  const data = `WIFI:T:${security};S:${ssid};P:${pass};;`;
  const qrContainer = document.getElementById('qrcode');
  qrContainer.innerHTML = '';

  qr = new QRCode(qrContainer, {
    text: data,
    width: 200,
    height: 200,
    colorDark: document.getElementById('qrColor').value,
    colorLight: document.getElementById('bgColor').value,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Show logo if any
  const logo = document.getElementById('qr-logo');
  if (logoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = () => logo.src = reader.result;
    reader.readAsDataURL(logoInput.files[0]);
  }

  document.getElementById('afterGenerate').classList.remove('hidden');
  document.getElementById('customizer').classList.remove('hidden');
}

function toggleCustomizer() {
  const box = document.getElementById('customizer');
  box.classList.toggle('hidden');
}

function downloadQR() {
  const canvas = document.querySelector('#qrcode canvas');
  const link = document.createElement('a');
  link.download = 'wifi-qr.png';
  link.href = canvas.toDataURL();
  link.click();
}

function printQR() {
  const win = window.open();
  win.document.write('<img src="' + document.querySelector('#qrcode canvas').toDataURL() + '" />');
  win.print();
  win.close();
}

function exportPDF() {
  const element = document.getElementById('qrcode');
  html2pdf().from(element).save("wifi-qr.pdf");
}
