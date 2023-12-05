import * as helpers from '/sidepanel-helpers.js'

export async function summarizeText(text) {
  const summarizePrompt = `Please summarize the following text in 2 paragraphs at most. Don't worry about the context, just try to rephrase the text more concisely. Text: ${text} `
  helpers.outputChatGPTPromptResponse(summarizePrompt)
}

export async function translateText(text) {
  const outputLanguage = document.getElementById("language-select").value;
  const translatePrompt = `Please translate the following text from English to ${outputLanguage}. Text: ${text}`
  helpers.outputChatGPTPromptResponse(translatePrompt)
}