// Função genérica para injetar e executar um script na aba ativa
async function executeScript(filePath) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [filePath]
  });
}

// Executa uma função diretamente na aba ativa via scripting.executeScript (aceita args)
async function executeFunctionOnActiveTab(func, args = []) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func,
    args
  }).catch(err => console.error('Erro ao executar função na aba:', err));
}

document.getElementById('btn-luz-azul').addEventListener('click', () => {
  executeScript('scripts/filtro-luz-azul.js');
});

// Slider de intensidade da luz azul: cria/atualiza overlay com a opacidade definida
const slider = document.getElementById('slider-luz-azul');
const sliderValue = document.getElementById('slider-luz-azul-value');
if (slider) {
  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (sliderValue) sliderValue.textContent = val + '%';

    // função injetada na página para criar/atualizar overlay
    const fn = (opacityPercent) => {
      const overlayId = 'assistente-visual-luz-azul-overlay';
      let overlay = document.getElementById(overlayId);

      // Não permitir opacidade total (max 85%) para preservar legibilidade
      const MAX = 85;
      const clamped = Math.max(0, Math.min(MAX, opacityPercent));
      const alpha = clamped / 100;

      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.zIndex = '999999';
        overlay.style.pointerEvents = 'none';
        // Blend mode faz com que a cor se misture ao conteúdo da página
        overlay.style.mixBlendMode = 'multiply';
        overlay.style.transition = 'background-color 160ms linear';
        document.documentElement.appendChild(overlay);
      }

      overlay.style.backgroundColor = `rgba(255,150,0,${alpha})`;
    };

    executeFunctionOnActiveTab(fn, [val]);
  });
}

document.getElementById('btn-monocromatico').addEventListener('click', () => {
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

// const btnAltoContraste = document.getElementById('btn-alto-contraste');
// if (btnAltoContraste) btnAltoContraste.addEventListener('click', () => {
//   executeScript('scripts/filtro-alto-contraste.js');
// });