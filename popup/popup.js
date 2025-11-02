// Função genérica para injetar e executar um script na aba ativa
async function executeScript(filePath) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [filePath]
  });
}

document.getElementById('btn-luz-azul').addEventListener('click', () => {
  executeScript('scripts/filtro-luz-azul.js');
});

document.getElementById('btn-daltonismo').addEventListener('click', () => {
  executeScript('scripts/filtro-monocromatico.js');
});

document.getElementById('btn-lupa').addEventListener('click', () => {
  executeScript('scripts/lupa.js');
});

// Novos botões: filtros de daltonismo específicos
const btnProtanopia = document.getElementById('btn-protanopia');
if (btnProtanopia) btnProtanopia.addEventListener('click', () => {
  executeScript('scripts/filtro-daltonismo-protanopia.js');
});

const btnDeuteranopia = document.getElementById('btn-deuteranopia');
if (btnDeuteranopia) btnDeuteranopia.addEventListener('click', () => {
  executeScript('scripts/filtro-daltonismo-deuteranopia.js');
});

const btnTritanopia = document.getElementById('btn-tritanopia');
if (btnTritanopia) btnTritanopia.addEventListener('click', () => {
  executeScript('scripts/filtro-daltonismo-tritanopia.js');
});