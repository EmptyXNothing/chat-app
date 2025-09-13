import { useState } from 'react';
import axios from 'axios';
import ERRORS from '../../errors.js';
import { useUser } from '../../hooks/useUser.jsx';
import { useModalStore } from '../../store/modalStore.js';
import routes from '../../routes.js';

const AddChannelModal = ({ handleClose }) => {
  const {closeModal } = useModalStore()
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const { headers } = useUser();

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
      await axios.post(routes.channels(), newChannel, {
        headers: headers,
      });
      setInput(() => '');
      closeModal()
    } catch (e) {
      setError(() => e.message);
    }
  };

  return (
    <div className="content">
      <h2>Добавить канал</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          ref={(input) => input?.focus()}
          placeholder="Channel name"
        />
        <div className='btn'>
          <button type="sumbit">Submit</button>
          <button onClick={() => handleClose()}>close</button>
        </div>
        
        {error && <div className="validation">{error}</div>}
      </form>
    </div>
  );
};

export default AddChannelModal;
