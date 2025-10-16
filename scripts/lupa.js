(function () {
  const LUPA_ID = 'assistente-visual-lupa';
  const ZOOM_LEVEL = 2; // Nível de zoom

  // Função que desliga a lupa e limpa os eventos
  function desativarLupa() {
    const lupa = document.getElementById(LUPA_ID);
    if (lupa) {
      lupa.remove();
    }
    document.removeEventListener('mousemove', moverLupa);
    document.removeEventListener('click', desativarLupaComClique);
  }

  function desativarLupaComClique(e) {
    // Impede que o clique para desativar faça outra ação na página
    e.preventDefault();
    e.stopPropagation();
    desativarLupa();
  }

  // Função que cria e ativa a lupa
  function ativarLupa() {
    // 1. Cria o elemento da lente (o círculo visível)
    const lupa = document.createElement('div');
    lupa.id = LUPA_ID;
    Object.assign(lupa.style, {
      position: 'fixed', // Usa 'fixed' para não se mover com o scroll
      width: '250px',
      height: '250px',
      border: '3px solid #1a73e8',
      borderRadius: '50%',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      overflow: 'hidden',
      zIndex: '9999999',
      pointerEvents: 'none', // Impede que a lupa bloqueie o mouse
      display: 'none' // Começa escondida
    });

    // 2. Cria o contêiner para o conteúdo ampliado
    const conteudoAmpliado = document.createElement('div');
    Object.assign(conteudoAmpliado.style, {
      transform: `scale(${ZOOM_LEVEL})`,
      transformOrigin: 'top left',
      position: 'absolute',
      width: `${document.documentElement.scrollWidth}px`,
      height: `${document.documentElement.scrollHeight}px`
    });

    // 3. Clona o corpo da página e anexa
    const cloneDoBody = document.body.cloneNode(true);
    conteudoAmpliado.appendChild(cloneDoBody);
    lupa.appendChild(conteudoAmpliado);
    document.body.appendChild(lupa);

    // 4. Adiciona os eventos
    document.addEventListener('mousemove', moverLupa);
    // Adiciona um listener para desativar com um clique
    setTimeout(() => document.addEventListener('click', desativarLupaComClique), 100);
  }

  // Função que move a lupa e o conteúdo clonado
  function moverLupa(e) {
    const lupa = document.getElementById(LUPA_ID);
    if (!lupa) return;

    lupa.style.display = 'block';

    const lupaRaio = lupa.offsetWidth / 2;
    const conteudo = lupa.firstChild;

    // Move a lente para a posição do cursor (coordenadas da janela)
    lupa.style.left = `${e.clientX - lupaRaio}px`;
    lupa.style.top = `${e.clientY - lupaRaio}px`;

    // Move o conteúdo clonado para a posição correta (coordenadas da página)
    const offsetX = lupaRaio - (e.pageX * ZOOM_LEVEL);
    const offsetY = lupaRaio - (e.pageY * ZOOM_LEVEL);

    conteudo.style.left = `${offsetX}px`;
    conteudo.style.top = `${offsetY}px`;
  }

  // LÓGICA DE TOGGLE: Se a lupa existe, remove. Se não, cria.
  if (document.getElementById(LUPA_ID)) {
    desativarLupa();
  } else {
    ativarLupa();
  }
})();