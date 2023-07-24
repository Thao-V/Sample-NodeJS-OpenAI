const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.get("", async (req, res) => {
  const {language} = req.query
  let question = `Please translate this sentence to ${req.query.language}: Hello World.`
  let url = "https://api.openai.com/v1/chat/completions";
  let body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: question
      }
    ]
  };
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  };
  try {
    const response = await axios.post(url, body, headers);
    return res.send(response.data.choices[0].message.content.trim());
  } catch (err) {
    res.send('Server Error');
  }
});

let port = 5001;
app.listen(port, () => console.log(`Listening on port ${port}`));
