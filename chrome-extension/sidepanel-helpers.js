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
  
  async function getPromptCompletion(prompt) {
    try {
      const openAiApiKey = await getAPIKey();
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${openAiApiKey}`);
      const body = {
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
            {role: "system", content: "You are a helpful assistant."},
            {role: "user", content: prompt},
        ]
      };
  
      const jsonBody = JSON.stringify(body)
  
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: headers,
        body: jsonBody
      });
  
      // Check if the response status is OK (status code 200)
      if (!response.ok) {
        throw new Error('Failed to get response from ChatGPT');
      }
  
      // Parse the response JSON
      const responseJson = await response.json();
  
      return responseJson.choices[0].message.content;
  
    } catch (error) {
      console.error(error);
      throw error
    }
  }
  
export async function outputChatGPTPromptResponse(prompt) {
    const outputDiv = document.getElementById("output");
    const loader = document.getElementById("loader");
    loader.style.display = "block";
  
    try {
      const response = await getPromptCompletion(prompt);
      outputDiv.textContent = response;
    } catch (err) {
      outputDiv.textContent = `Error: ${err.message}`;
    } finally {
      loader.style.display = "none";
      // Hide the language selector
      const langSelector = document.getElementById("lang-selector");
      langSelector.style.display = "none";
    }
  }
  