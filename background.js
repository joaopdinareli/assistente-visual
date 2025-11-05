// Background service worker: listens for keyboard commands and executes scripts in the active tab
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'toggle-lupa') {
        try {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            const tab = tabs && tabs[0];
            if (tab && tab.id) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['scripts/lupa.js']
                }).catch(err => console.error('Erro ao executar lupa.js via comando:', err));
            }
        } catch (err) {
            console.error('Erro ao buscar aba ativa para comando toggle-lupa:', err);
        }
    }
});
