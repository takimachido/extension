// Escuta o evento de teclas pressionadas
document.addEventListener("keydown", (event) => {
  // Verifica se as teclas Ctrl + Shift + P foram pressionadas
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {
    // Obtém o texto selecionado na página
    const selectedText = window.getSelection().toString().trim();

    // Verifica se há algum texto selecionado
    if (selectedText) {
      // Envia o texto selecionado para o background.js
      chrome.runtime.sendMessage({ contractAddress: selectedText });
    } else {
      // Alerta o usuário caso nenhum texto tenha sido selecionado
      alert("Please, select a Contract Address.");
    }
  }
});
