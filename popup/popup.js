// Função genérica para injetar e executar um script na aba ativa
async function executeScript(filePath) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [filePath]
  });
}