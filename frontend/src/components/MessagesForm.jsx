import '../styles/App.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { UserContext } from '../Contexts/UserProvider.jsx';
import { useContext } from 'react';

const MessagesForm = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const {user} = useContext(UserContext)
  const [input, setInput] = useState('');

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: input,
      channelId: currentChannelId,
      username: user.username,
    };
    axios
      .post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log(response.data); 
      });
  };
  return (
    <div className="messages-form">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} value={input}></input>
        <button type="sumbit">Send</button>
      </form>
    </div>
  );
};

export default MessagesForm;
