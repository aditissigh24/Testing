import { useState } from 'react';

function GeminiChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi there! I\'m your comedic Gemini chatbot. Ask me anything!',
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    const userText = input;
    setInput('');
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Respond in a funny and humorous way to: ${userText}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const geminiText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Uh oh, my jokes fell flat. Try again!';
      setMessages((msgs) => [...msgs, { role: 'assistant', content: geminiText }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: 'Oops! Something went wrong.' },
      ]);
    }
  };

  return (
    <div className="whatsapp-chatbot">
      <div className="whatsapp-chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.role}`}> 
            <span className="message-text">{m.content}</span>
          </div>
        ))}
      </div>
      <div className="whatsapp-chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} aria-label="Send">
          ➤
        </button>
      </div>
    </div>
  );
}

export default GeminiChatbot;
