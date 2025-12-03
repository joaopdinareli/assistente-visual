// Alto contraste — implementado via CSS Filter (mais compatível e moderno)
(function () {
    const STYLE_ID = 'assistente-visual-high-contrast-style';

    // Se o estilo já existe, remove e desativa o modo
    const existingStyle = document.getElementById(STYLE_ID);
    if (existingStyle) {
        existingStyle.remove();
        return;
    }

    // Cria o bloco de estilo para alto contraste inteligente
    // 1. html: Inverte as cores (invert) e rotaciona a matiz (hue-rotate) para manter cores como azul/vermelho reconhecíveis.
    // 2. Aumenta o contraste (contrast) para garantir legibilidade.
    // 3. Mídias: Reverte o filtro para que fotos e vídeos pareçam naturais.
    const css = `
        html {
            filter: invert(100%) hue-rotate(180deg) contrast(115%) !important;
            background-color: #fff !important; /* Garante base para inversão correta */
            min-height: 100vh;
        }

        /* Reverte a inversão para elementos de mídia para que não pareçam negativos de foto */
        img, video, picture, canvas, svg, iframe, embed, object {
            filter: invert(100%) hue-rotate(180deg) !important;
        }
        
        /* Opcional: Ajuste para imagens de fundo se necessário, mas difícil de detectar genericamente */
    `;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();
