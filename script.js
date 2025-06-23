// script.js

let qr;

function generateQRCode() {
  const ssid = document.getElementById("ssid").value;
  const password = document.getElementById("password").value;
  const encryption = document.getElementById("encryption").value;
  const qrColor = document.getElementById("qrColor").value;
  const bgColor = document.getElementById("bgColor").value;
  const logoFile = document.getElementById("logoUpload").files[0];

  let qrData = `WIFI:T:${encryption};S:${ssid};`;
  if (encryption !== "nopass") qrData += `P:${password};`;
  qrData += ";";

  const qrCodeDiv = document.getElementById("qrcode");
  qrCodeDiv.innerHTML = "";

  qr = new QRCode(qrCodeDiv, {
    text: qrData,
    width: 200,
    height: 200,
    colorDark: qrColor,
    colorLight: bgColor,
    correctLevel: QRCode.CorrectLevel.H
  });

  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgTag = document.querySelector("#qrcode img");
      if (imgTag) {
        const overlay = document.createElement("img");
        overlay.src = e.target.result;
        overlay.style.position = "absolute";
        overlay.style.width = "40px";
        overlay.style.height = "40px";
        overlay.style.left = "calc(50% - 20px)";
        overlay.style.top = "calc(50% - 20px)";
        overlay.style.borderRadius = "10px";
        overlay.style.zIndex = "10";
        imgTag.parentNode.style.position = "relative";
        imgTag.parentNode.appendChild(overlay);
      }
    };
    reader.readAsDataURL(logoFile);
  }

  localStorage.setItem("ssid", ssid);
  localStorage.setItem("password", password);
  localStorage.setItem("encryption", encryption);
}

document.getElementById("downloadBtn").addEventListener("click", () => {
  const img = document.querySelector("#qrcode img");
  if (img) {
    const a = document.createElement("a");
    a.href = img.src;
    a.download = "wifi-qr.png";
    a.click();
  } else {
    alert("Please generate QR code first.");
  }
});

document.getElementById("exportPDF").addEventListener("click", () => {
  const qrCard = document.querySelector(".card");
  html2pdf(qrCard, {
    margin: 0.5,
    filename: 'wifi-card.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  });
});

document.getElementById("modeSwitch").addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

function resetForm() {
  document.getElementById("ssid").value = "";
  document.getElementById("password").value = "";
  document.getElementById("encryption").value = "WPA";
  document.getElementById("logoUpload").value = "";
  document.getElementById("qrcode").innerHTML = "";
}

window.onload = () => {
  // Restore saved data
  document.getElementById("ssid").value = localStorage.getItem("ssid") || "";
  document.getElementById("password").value = localStorage.getItem("password") || "";
  document.getElementById("encryption").value = localStorage.getItem("encryption") || "WPA";
};
