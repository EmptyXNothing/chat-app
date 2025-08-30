import '../styles/App.css';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

const MessagesForm = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { user } = useUser();
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId]);

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setInput(() => '');
  };
  return (
    <div className="messages-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          autoComplete="off"
          value={input}
          ref={inputRef}
        ></input>
        <button type="sumbit">Send</button>
      </form>
    </div>
  );
};

export default MessagesForm;
