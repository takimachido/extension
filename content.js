
document.addEventListener("keydown", (event) => {

  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {

    const selectedText = window.getSelection().toString().trim();


    if (selectedText) {

      chrome.runtime.sendMessage({ contractAddress: selectedText });
    } else {

      alert("Please, select a Contract Address.");
    }
  }
});
