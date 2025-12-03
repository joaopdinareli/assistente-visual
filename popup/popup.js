// Funções utilitárias para injetar scripts / funções na aba ativa
async function executeScript(filePath) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;
  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: [filePath] });
  } catch (err) {
    console.error('Erro ao injetar script:', filePath, err);
  }
}

async function executeFunctionOnActiveTab(func, args = []) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;
  try {
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, func, args });
  } catch (err) {
    console.error('Erro ao executar função na aba:', err);
  }
}

// Associação de comandos a elementos (mantém IDs originais para compatibilidade)
const actions = [
  { id: 'btn-luz-azul', fn: () => executeScript('scripts/filtro-luz-azul.js') },
  { id: 'btn-lupa', fn: () => executeScript('scripts/lupa.js') },
  { id: 'btn-monocromatico', fn: () => executeScript('scripts/filtro-monocromatico.js') },
  { id: 'btn-protanopia', fn: () => executeScript('scripts/filtro-daltonismo-protanopia.js') },
  { id: 'btn-deuteranopia', fn: () => executeScript('scripts/filtro-daltonismo-deuteranopia.js') },
  { id: 'btn-tritanopia', fn: () => executeScript('scripts/filtro-daltonismo-tritanopia.js') },
  { id: 'btn-alto-contraste', fn: () => executeScript('scripts/filtro-alto-contraste.js') } // Added action
];

actions.forEach(a => {
  const el = document.getElementById(a.id);
  if (el) el.addEventListener('click', a.fn);
});

// Slider de intensidade da luz azul — mantém a mesma lógica já existente
const slider = document.getElementById('slider-luz-azul');
const sliderValue = document.getElementById('slider-luz-azul-value');
if (slider) {
  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (sliderValue) sliderValue.textContent = val + '%';

    const fn = (opacityPercent) => {
      const overlayId = 'assistente-visual-luz-azul-overlay';
      let overlay = document.getElementById(overlayId);
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
        overlay.style.mixBlendMode = 'multiply';
        overlay.style.transition = 'background-color 160ms linear';
        document.documentElement.appendChild(overlay);
      }
      overlay.style.backgroundColor = `rgba(255,150,0,${alpha})`;
    };

    executeFunctionOnActiveTab(fn, [val]);
  });
}

// Botão fechar (apenas fecha o popup)
const btnClose = document.getElementById('btn-close');
if (btnClose) btnClose.addEventListener('click', () => window.close());

// --- Interações visuais/feedback ---
// Aplica feedback visual curto (classe 'pressed') para clicks e teclado
function addInteractionFeedback(el) {
  if (!el) return;
  let timeoutId = null;

  const add = () => {
    el.classList.add('pressed');
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => el.classList.remove('pressed'), 180);
  };

  const remove = () => {
    if (timeoutId) clearTimeout(timeoutId);
    el.classList.remove('pressed');
  };

  el.addEventListener('pointerdown', add);
  el.addEventListener('pointerup', remove);
  el.addEventListener('pointerleave', remove);
  el.addEventListener('touchend', remove);

  // keyboard support: add visual feedback on Enter/Space
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
      add();
      // remove shortly after keydown to mimic native behavior
      setTimeout(remove, 180);
    }
  });
}

// Apply feedback to interactive elements (without changing behavior)
document.querySelectorAll('.action, .chip, .icon-btn').forEach(addInteractionFeedback);

// Also ensure keyboard activation works for buttons (default works for <button>),
// but add a safe handler to trigger click when Enter/Space pressed on non-button interactive elements.
document.addEventListener('keydown', (e) => {
  const active = document.activeElement;
  if (!active) return;
  const role = active.getAttribute('role');
  const isButtonLike = active.tagName === 'BUTTON' || role === 'button' || active.classList.contains('chip') || active.classList.contains('action');
  if (!isButtonLike) return;
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    // let native behavior happen for actual buttons — but for uniformity, call click
    e.preventDefault();
    active.click();
  }
});