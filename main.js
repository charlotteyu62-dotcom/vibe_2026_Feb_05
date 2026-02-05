class ChatBot extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const chatContainer = document.createElement('div');
    chatContainer.setAttribute('class', 'chat-container');

    const messageHistory = document.createElement('div');
    messageHistory.setAttribute('class', 'message-history');

    const inputContainer = document.createElement('div');
    inputContainer.setAttribute('class', 'input-container');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Ask me about a country in Asia-Pacific...');

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';

    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);

    chatContainer.appendChild(messageHistory);
    chatContainer.appendChild(inputContainer);

    const style = document.createElement('style');
    style.textContent = `
      .chat-container {
        width: 400px;
        height: 600px;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background-color: #fff;
        font-family: sans-serif;
      }
      .message-history {
        flex-grow: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .message {
        padding: 0.75rem 1rem;
        border-radius: 15px;
        max-width: 80%;
        line-height: 1.4;
      }
      .bot-message {
        background-color: #f0f0f0;
        color: #333;
        align-self: flex-start;
        border-bottom-left-radius: 0;
      }
      .user-message {
        background-color: #007bff;
        color: #fff;
        align-self: flex-end;
        border-bottom-right-radius: 0;
      }
      .input-container {
        display: flex;
        padding: 1rem;
        border-top: 1px solid #eee;
      }
      input {
        flex-grow: 1;
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 5px;
        font-size: 1rem;
      }
      button {
        margin-left: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      button:hover {
        background-color: #0056b3;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(chatContainer);

    const addMessage = (text, sender) => {
        const messageElement = document.createElement('div');
        messageElement.setAttribute('class', `message ${sender}-message`);
        messageElement.textContent = text;
        messageHistory.appendChild(messageElement);
        messageHistory.scrollTop = messageHistory.scrollHeight;
    }

    const getBotResponse = (userText) => {
        const text = userText.toLowerCase();
        if (text.includes("hello") || text.includes("hi")) {
            return "Hello! I'm your travel advisor. Which country in the Asia-Pacific region are you interested in?";
        }
        if (text.includes("japan")) {
            return "Japan is a great choice! What would you like to know? (e.g., travel restrictions, dress code, food)";
        }
        if (text.includes("travel restrictions")) {
            return "Most countries have lifted COVID-19 restrictions, but it's always best to check the official government immigration website for the latest updates before you travel.";
        }
        if (text.includes("dos") && text.includes("don'ts")) {
            return "In many Asian cultures, it's important to be respectful of elders, remove your shoes before entering someone's home, and avoid pointing with your feet. Specific customs vary by country.";
        }
        if (text.includes("dress code")) {
            return "For most tourist areas, casual wear is fine. However, when visiting temples or religious sites, it's important to dress modestly. This usually means covering your shoulders and knees.";
        }
        if (text.includes("alcohol")) {
            return "Alcohol is widely available in many East Asian countries like Japan and South Korea. In some Southeast Asian countries and regions with large Muslim populations, there may be restrictions on availability and consumption.";
        }
        if (text.includes("lgbt") || text.includes("safety")) {
            return "LGBTQ+ rights and acceptance vary widely across the Asia-Pacific. In some countries, it's very safe, while in others, caution is advised. For specific country information, I can provide more details.";
        }
        if (text.includes("food") || text.includes("recommendation")) {
            return "The Asia-Pacific region has an incredible variety of food! To give you the best recommendations, could you tell me which country you're asking about?";
        }
        if (text.includes("hotel")){
            return "To recommend a hotel, I need to know your destination city and budget. There are great options ranging from budget hostels to luxury resorts.";
        }
        return "I'm sorry, I don't have information about that right now. Please ask me about travel restrictions, dress code, food, or other topics for a country in the Asia-Pacific region.";
    }

    const handleUserInput = () => {
        const userText = input.value.trim();
        if (userText === '') return;

        addMessage(userText, 'user');
        input.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot');
        }, 500);
    }

    sendButton.addEventListener('click', handleUserInput);
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    addMessage("Hello! I am your travel advisor. Ask me about a country in the Asia-Pacific region you want to travel to.", 'bot');

  }
}

customElements.define('chat-bot', ChatBot);