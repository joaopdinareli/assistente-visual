(function () {
  const overlayId = 'assistente-visual-luz-azul-overlay';
  let existingOverlay = document.getElementById(overlayId);

  if (existingOverlay) {
    // Se o filtro já existe, remove-o
    existingOverlay.remove();
  } else {
    // Se não existe, cria e adiciona o filtro
    const overlay = document.createElement('div');
    overlay.id = overlayId;
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(255, 150, 0, 0.15)'; // Cor alaranjada, semi-transparente
    overlay.style.zIndex = '999999'; // Garante que fique por cima de tudo
    overlay.style.pointerEvents = 'none'; // Impede que o overlay bloqueie cliques

    document.body.appendChild(overlay);
  }
})();