## process
1. upload main.js to SAC custom widget
2. create canvas and button
3. edit button onclick event , calling custom widget passing data.

```typescript
var APIKey = "SECRET_API_KEY";
var prompt = InputField_prompt.getValue();
var response = chatGPTInSAC_1.post(APIKey,endpoint,prompt);
Text_response.applyText(response);
```
## reference site
1. https://learn.microsoft.com/en-us/azure/ai-services/openai/reference-preview
2. https://community.sap.com/t5/technology-blogs-by-members/bringing-chatgpt-in-sap-analytics-cloud-using-custom-widget/ba-p/13567616
3. https://platform.openai.com/tokenizer

## here are some prompt rule:  
[ROLE] - Describe who you are or your role.  
[INSTRUCTIONS] - Explain what you want to do step by step.  
[CONTEXT] - Provide some background or setting information.  
[CONSTRAINTS] - Mention any limitations or restrictions.  
[EXAMPLES] - Give a few examples related to what you want to do.  
[角色] - 描述您是誰或您的角色。  
[說明] - 逐步解釋您想要做什麼。  
[上下文] - 提供一些背景或設定資訊。  
[限制] - 提及任何限製或限制。  
[範例] - 給出一些與您想做的事情相關的範例。  
