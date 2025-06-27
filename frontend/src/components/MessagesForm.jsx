import '../styles/App.css';
import { useState } from 'react';

const MessagesForm = () => {
  const [input, setInput] = useState('')

  const handleInput = (e) => {
    setInput(() => e.target.value)
  }

  const handleSubmit = () => {
    console.log(input)
  }

  return (
    <div className="messages-form">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInput} value={input}></input>
        <button type='sumbit'>Send</button>
      </form>
    </div>
  );
};

export default MessagesForm;
