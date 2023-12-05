import * as actions from '/sidepanel-actions.js'

chrome.runtime.onMessage.addListener(async ({ name, data }) => {
    if (name === 'summarize-text') {
      actions.summarizeText(data);
    }
    else if (name === 'translate-text') {
      // Store text we want to translate in the 'output' div
      const outputDiv = document.getElementById("output");
      outputDiv.textContent = data;
  
      // Show the language selector
      const langSelector = document.getElementById("lang-selector");
      langSelector.style.display = "block";
    }
  });
  
  document.getElementById("translate-button").addEventListener("click", function() {actions.translateText(document.getElementById("output").textContent)});
  