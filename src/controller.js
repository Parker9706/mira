import { Configuration, OpenAIApi } from "openai";
import fetch from 'node-fetch';


async function getChatResponse(message) {
  const accessToken = process.env.OPENAI_KEY;
  const configuration = new Configuration({
    apiKey: accessToken,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    stop: ["You:"],
  })
  .then(res => {
    return res.data.choices[0].text;
  })
  .catch(err => console.error(err));
  return response;
}

async function sendSlackResponse(message) {
  const url = process.env.SLACK_URL;
  const data = { "text": message }; 
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    return res;
  })
  .catch(err => console.error(err));
}


export { getChatResponse, sendSlackResponse };
