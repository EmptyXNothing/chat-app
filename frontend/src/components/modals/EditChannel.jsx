import { useState } from 'react';
import axios from 'axios';
import ERRORS from '../../errors.js';
import { useUser } from '../../hooks/useUser.jsx';
import { useChannelStore } from "../../store/channelStore";
import { useModalStore } from '../../store/modalStore.js';
import routes from '../../routes.js';

const EditChannelModal = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const { headers } = useUser();
  const { modal, closeModal } = useModalStore();
  const { currentChannel, setCurrentChannel } = useChannelStore();

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
      const changes = { name: input };
      const response = await axios.patch(routes.channel(modal.data.id), changes, {
        headers,
      });
      const editedChannel = response.data
      if (currentChannel.id === editedChannel.id){
        setCurrentChannel(editedChannel)
      }
      setInput(() => '');
      closeModal();
    } catch (e) {
      setError(() => e.message);
    }
  };

  return (
    <div className="edit-channel-name-form">
      <form onSubmit={handleSubmit}>
        <h2>{modal.data.name}</h2>
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
