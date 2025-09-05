import '../styles/App.css';
import { useState, useRef } from 'react';
import { useChannelStore } from '../store/channelStore';
import axios from 'axios';
import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import routes from '../routes';

const MessagesForm = () => {
  const { currentChannel } = useChannelStore();
  const { user, headers} = useUser();
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannel]);

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: input,
      channelId: currentChannel.id,
      username: user.username,
    };
    axios
      .post(routes.messages(), newMessage, {
        headers: headers,
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
