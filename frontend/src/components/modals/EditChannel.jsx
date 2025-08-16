import { closeModal } from '../../slices/modalSlice.js';
import { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../contexts/UserProvider.jsx';
import axios from 'axios';

const EditChannelModal = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const { headers } = useContext(UserContext);
  const { data } = useSelector((state) => state.modal)

  const handleInput = (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedChannel = { name: input };
    axios.patch(`/api/v1/channels/${data.id}`, editedChannel, {
      headers,
    });
    setInput(() => '');
    dispatch(closeModal());
  };

  return (
      <div className="edit-channel-name-form">
        <form onSubmit={handleSubmit}>
          <h2>{data.name}</h2>
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

export default EditChannelModal;
