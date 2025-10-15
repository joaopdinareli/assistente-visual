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