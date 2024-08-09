require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const Groq = require("groq-sdk");
const groq = new Groq({
  apiKey: "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", 
});
   
    const result = await groq.chat.completions.create({
      messages: [
          {
              role: "user",
              content: `${message}  Add explanatory comments for the code snippet above. and give me modifed code again Dont Provide Explnation Only give me code with comments add in it.`
          }
      ],
      model: "llama3-8b-8192"
  });
    res.json({ botResponse: result.choices[0]?.message?.content || "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});