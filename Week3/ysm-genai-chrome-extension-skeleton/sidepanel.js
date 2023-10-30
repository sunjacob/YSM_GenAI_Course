//--------------------------------------------------------------------------------------------------
//------------------------- DO NOT MODIFY ----------------------------------------------------------
async function getAPIKey() {
  const result = await chrome.storage.local.get('openAiApiKey');
  if (!result.openAiApiKey) {
    throw new Error("Missing OpenAI API Key")
  }
  return result.openAiApiKey;
}



//Populate the languages list
const langSelector = document.getElementById("language-select");
fetch('./languages.json').then((file) => file.json()).then((languages) => {
  languages.forEach((l) => {
    const option = document.createElement("option");
    option.value = l;
    option.text = l;
    langSelector.appendChild(option);
  });
});

chrome.runtime.onMessage.addListener(async ({ name, data }) => {
  if (name === 'summarize-text') {
    summarizeText(data);
  }
  else if (name === 'translate-text') {
    // Store text we want to translate in the 'output' div
    const outputDiv = document.getElementById("output");
    outputDiv.textContent = data;

    // Show the language selector
    const langSelector = document.getElementById("lang-selector");
    langSelector.style.display = "block";
  }
  else if (name === '???') {
    // ???
  }
});

document.getElementById("translate-lang-button").addEventListener("click", translateText);

//------------------------- DO NOT MODIFY ----------------------------------------------------------
//--------------------------------------------------------------------------------------------------



async function summarizeText(text) {
  // TODO
}



async function translateText() {
  // TODO
}

