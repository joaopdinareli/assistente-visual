// Tritanopia: dificuldade com azul e amarelo
(function () {
    const SVG_ID = 'assistente-visual-daltonismo-tritanopia-svg';
    const FILTER_ID = 'assistente-visual-daltonismo-tritanopia';

    // Matriz aproximada para tritanopia
    const matrix = [
        0.95, 0.05, 0, 0, 0,
        0, 0.433, 0.567, 0, 0,
        0, 0.475, 0.525, 0, 0,
        0, 0, 0, 1, 0
    ];

    function valuesAttr(arr) {
        return arr.join(' ');
    }

    const existing = document.getElementById(SVG_ID);
    if (existing) {
        existing.remove();
        if (document.documentElement.style.filter && document.documentElement.style.filter.indexOf(FILTER_ID) !== -1) {
            document.documentElement.style.filter = 'none';
        }
        return;
    }

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

    document.documentElement.style.filter = `url(#${FILTER_ID})`;
})();
