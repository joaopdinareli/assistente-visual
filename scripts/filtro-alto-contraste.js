// Alto contraste — implementado via classe + <style> injetado
(function () {
    const STYLE_ID = 'assistente-visual-high-contrast-style';
    const CLASS_NAME = 'assistente-visual-high-contrast';

    // Se o estilo já existe, remove e desativa o modo
    const existingStyle = document.getElementById(STYLE_ID);
    if (existingStyle) {
        existingStyle.remove();
        document.documentElement.classList.remove(CLASS_NAME);
        return;
    }

    // Cria o bloco de estilo para alto contraste
    const css = `
.${CLASS_NAME}, .${CLASS_NAME} * {
    background-color: #000 !important;
    color: #fff !important;
    border-color: #fff !important;
    box-shadow: none !important;
    text-shadow: none !important;
}

/* Não substituir diretamente imagens/vídeos — permitem que permaneçam naturais */
.${CLASS_NAME} img, .${CLASS_NAME} video, .${CLASS_NAME} svg {
    background-color: transparent !important;
    color: inherit !important;
    filter: none !important;
}

/* Links em alto contraste: branco por padrão, mas com destaque */
.${CLASS_NAME} a, .${CLASS_NAME} a * {
    color: #9be3ff !important;
}

/* Evita que elementos muito pequenos percam legibilidade */
.${CLASS_NAME} input, .${CLASS_NAME} textarea, .${CLASS_NAME} select {
    background-color: #000 !important;
    color: #fff !important;
}
`;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    // Ativa a classe no documento
    document.documentElement.classList.add(CLASS_NAME);
})();
