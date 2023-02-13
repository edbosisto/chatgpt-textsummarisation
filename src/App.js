import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summarisedText, setSummarisedText] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: generatePrompt(text),
        temperature: 0.6,
        max_tokens: 100,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setSummarisedText(res?.data?.choices[0].text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");
      });
  };

  function generatePrompt(text) {
    return `Summarize this ${text}, and break it into separate lines`;
  }

  return (
    <section>
      <div className="App_">
        <div className="header">
          <h1 className="header_text">
            Text <span className="text_active">Summariser</span>
          </h1>
          <h2 className="header_summary"> Summarise your text</h2>
        </div>
        <div className="container">
          <div className="text_form">
            <form>
              <label>Enter your text</label>
              <textarea
                rows={14}
                cols={80}
                placeholder="Text to be summarised"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          </div>
          <div>
            <button type="button" onClick={handleSubmit}>
              {loading ? "loading..." : "Summarise"}
            </button>
          </div>
          <div className="summarised_text">
            <label>Summarised text</label>
            <textarea
              placeholder="Summarised text"
              rows={14}
              cols={80}
              value={summarisedText}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
