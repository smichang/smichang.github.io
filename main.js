var ajaxCall = (key, url, prompt) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            data: JSON.stringify({
                messages: [
                {
                    role: "system",
                    content: "You are a professional report analyst who is good at interpreting dimensions, making statistics within the scope of the provided information, and can answer various statistical information. Your answer needs to be based on the data in the report, and you should not generate non-existent statistical information on your own."
                },
                {
                    role: "user",
                    content: [{ type: "text", text: prompt }]
                }
                          ],
                max_tokens: 1000,
                n: 1,
                top_p: 0.95,
                temperature: 0.7,
            }),
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
            },
            crossDomain: true,
            success: function (response, status, xhr) {
                resolve({ response, status, xhr });
            },
            error: function (xhr, status, error) {
                console.error('Error:', error); // Log the actual error
                reject(new Error(`XHR error: ${xhr.status}`));
            },
        });
    });
};

// Update the URL to point to Azure OpenAI
const url = "https://pcg-sap-gai-poc.openai.azure.com/openai/deployments/PCG-SAP-GAI-POC";

(function () {
  const template = document.createElement("template");
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `;
  class MainWebComponent extends HTMLElement {
        constructor() {
            super();
            // Initialize component state or properties here if needed
        }
        async post(apiKey, endpoint, prompt) {
            try {
                const { response } = await ajaxCall(apiKey, `${url}/${endpoint}`, prompt);
                console.log(response.choices[0].message.content);
                return response.choices[0].message.content;
            } catch (error) {
                console.error('Error in post method:', error);
                throw error;
            }
        }
        connectedCallback() {
            // Actions to take when the component is added to the DOM
        }
        disconnectedCallback() {
            // Cleanup when the component is removed from the DOM
        }
    }
    customElements.define("custom-widget", MainWebComponent);
})();
