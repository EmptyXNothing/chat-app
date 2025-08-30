import { closeModal } from '../../slices/modalSlice.js';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ERRORS from '../../errors.js';
import { useUser } from '../../hooks/useUser.jsx';

const EditChannelModal = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const { headers } = useUser();
  const { data } = useSelector((state) => state.modal);

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
      const editedChannel = { name: input };
      await axios.patch(`/api/v1/channels/${data.id}`, editedChannel, {
        headers,
      });
      setInput(() => '');
      dispatch(closeModal());
    } catch (e) {
      setError(() => e.message);
    }
  };

  return (
    <div className="edit-channel-name-form">
      <form onSubmit={handleSubmit}>
        <h2>{data.name}</h2>
        <div className="form-content">
          <div className="flex">
            <input
              type="text"
              onChange={handleInput}
              value={input}
              ref={(input) => input?.focus()}
              placeholder="Channel name"
            />
            <button type="sumbit">Submit</button>
          </div>
          {error && <div className="validation">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default EditChannelModal;
