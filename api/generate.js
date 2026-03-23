export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: "Create a website HTML for: " + prompt
        }
      ]
    })
  });

  const data = await response.json();
  const html = data.choices[0].message.content;

  res.status(200).send(html);
}
