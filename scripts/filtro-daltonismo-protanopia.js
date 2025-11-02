// Protanopia: dificuldade com o vermelho
(function () {
    const SVG_ID = 'assistente-visual-daltonismo-protanopia-svg';
    const FILTER_ID = 'assistente-visual-daltonismo-protanopia';

    // Matriz aproximada para protanopia (aplicada como feColorMatrix)
    const matrix = [
        0.567, 0.433, 0, 0, 0,
        0.558, 0.442, 0, 0, 0,
        0, 0.242, 0.758, 0, 0,
        0, 0, 0, 1, 0
    ];

    function valuesAttr(arr) {
        return arr.join(' ');
    }

    // Se já existe, remove (toggle)
    const existing = document.getElementById(SVG_ID);
    if (existing) {
        existing.remove();
        // Restaura o filtro da raiz
        if (document.documentElement.style.filter && document.documentElement.style.filter.indexOf(FILTER_ID) !== -1) {
            document.documentElement.style.filter = 'none';
        }
        return;
    }

    // Cria SVG defs com a matriz
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', SVG_ID);
    svg.setAttribute('style', 'position:absolute;width:0;height:0;');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', FILTER_ID);

    const fe = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    fe.setAttribute('type', 'matrix');
    fe.setAttribute('values', valuesAttr(matrix));

    filter.appendChild(fe);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    // Aplica o filtro na raiz do documento
    document.documentElement.style.filter = `url(#${FILTER_ID})`;
})();
