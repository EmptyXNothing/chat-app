import { closeModal } from '../../slices/modalSlice.js';
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../contexts/UserProvider.jsx';
import axios from 'axios'

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const { headers } = useContext(UserContext);

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChannel = { name: input };
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: headers,
    });
    setInput(() => '');
    dispatch(closeModal());
  };

  return (
    <div className="add-channel-name-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          ref={(input) => input?.focus()}
          placeholder="Channel name"
        ></input>
        <button type="sumbit">Submit</button>
      </form>
    </div>
  );
};

export default AddChannelModal;
