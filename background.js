function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "open-pumpfun",
      title: "Flash Pump.fun",
      contexts: ["selection"]
    });

    chrome.contextMenus.create({
      id: "open-dexscreener",
      title: "Flash Dexscreener",
      contexts: ["selection"]
    });

    chrome.contextMenus.create({
      id: "open-solscan",
      title: "Flash Solscan",
      contexts: ["selection"]
    });

    chrome.contextMenus.create({
      id: "open-photon",
      title: "Flash Photon",
      contexts: ["selection"]
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();

  chrome.tabs.create({
    url: "https://x.com/flashscreener/status/1967419496408244622"
  });
});

chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText?.trim();
  if (!selectedText) return;

  let url;
  switch (info.menuItemId) {
    case "open-pumpfun":
      url = "https://pump.fun/coin/" + selectedText;
      break;
    case "open-dexscreener":
      url = "https://dexscreener.com/solana/" + selectedText;
      break;
    case "open-solscan":
      url = "https://solscan.io/token/" + selectedText;
      break;
    case "open-photon":
      url = "https://photon-sol.tinyastro.io/en/lp/" + selectedText;
      break;
  }

  if (url) {
    chrome.tabs.create({ url });
  }
});

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => window.getSelection().toString()
      },
      (selection) => {
        const selectedText = selection[0]?.result.trim();
        if (!selectedText) {
          alert("Select a CA.");
          return;
        }

        let url;
        switch (command) {
          case "open-pumpfun":
            url = "https://pump.fun/coin/" + selectedText;
            break;
          case "open-dexscreener":
            url = "https://dexscreener.com/solana/" + selectedText;
            break;
          case "open-solscan":
            url = "https://solscan.io/token/" + selectedText;
            break;
          case "open-photon":
            url = "https://photon-sol.tinyastro.io/en/lp/" + selectedText;
            break;
        }

        if (url) {
          chrome.tabs.create({ url });
        }
      }
    );
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({
    url: "chrome://extensions/shortcuts"
  });
});
