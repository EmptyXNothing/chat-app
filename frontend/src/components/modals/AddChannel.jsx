import { closeModal } from '../../slices/modalSlice.js';
import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../contexts/UserProvider.jsx';
import axios from 'axios';
import ERRORS from '../../errors.js';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const { headers } = useContext(UserContext);

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length === 0) {
      setError(() => ERRORS.empty);
      return;
    }
    if (input.length > 30) {
      setError(() => ERRORS.overfull);
      return;
    }
    try {
      const newChannel = { name: input };
      const response = await axios.post('/api/v1/channels', newChannel, {
        headers: headers,
      });
      setInput(() => '');
      dispatch(closeModal());
    } catch (e) {
      setError(() => e.message);
    }
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
        />
        <button type="sumbit">Submit</button>
          {error && <div className="validation">{error}</div>}
      </form>
    </div>
  );
};

export default AddChannelModal;
