var ajaxCall = (key, url, prompt) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(
                {
                	"messages": [
                		{
                            "role": "user",
                            "content": prompt 
                        }
                	],
                	"max_tokens": 4096,
                	"n": 1,
                	"top_p": 1,
                	"temperature": 0
                }
            ),
            headers: {
                "Content-Type": "application/json",
                "api-key": key,
            },
            crossDomain: true,
            success: function (response, status, xhr) {
                resolve({ response, status, xhr });
            },
            error: function (xhr, status, error) {
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    const errorMessage = errorResponse.error.message;
                    console.error(`Error ${xhr.status}: ${errorMessage}`);
                    reject(new Error(`Error ${xhr.status}: ${errorMessage}`));
                } catch (e) {
                    console.error('Failed to parse error response', e);
                    reject(new Error('Failed to parse error response'));
                }
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
                // console.log(response.choices[0].message.content);
                console.log("token_usage(prompt+completion): " + response.usage.prompt_tokens + " + " + response.usage.completion_tokens + " = " + response.usage.total_tokens);
                return response.choices[0].message.content;
            } catch (error) {
                console.error('Error in post method:', error);
                return error;
                //throw error;
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
