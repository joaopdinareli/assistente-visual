(function () {
  const pageElement = document.documentElement;

  // Verifica se o filtro já está ativo e alterna (liga/desliga)
  if (pageElement.style.filter === 'grayscale(100%)') {
    pageElement.style.filter = 'none';
  } else {
    pageElement.style.filter = 'grayscale(100%)';
  }
})();