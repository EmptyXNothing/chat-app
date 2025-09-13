import { useState } from "react";
import axios from "axios";
import ERRORS from "../../errors.js";
import { useUser } from "../../hooks/useUser.jsx";
import { useChannelStore } from "../../store/channelStore";
import { useModalStore } from "../../store/modalStore.js";
import routes from "../../routes.js";

const EditChannelModal = ({ handleClose }) => {
  const [input, setInput] = useState("");
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
      const response = await axios.patch(
        routes.channel(modal.data.id),
        changes,
        {
          headers,
        }
      );
      const editedChannel = response.data;
      if (currentChannel.id === editedChannel.id) {
        setCurrentChannel(editedChannel);
      }
      setInput(() => "");
      closeModal();
    } catch (e) {
      setError(() => e.message);
    }
  };

  return (
    <div className="content">
      <h2>{modal.data.name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          ref={(input) => input?.focus()}
          placeholder="Channel name"
        />
        <div className="btn">
          <button type="sumbit">Submit</button>
          <button onClick={() => handleClose()}>close</button>
        </div>
        {error && <div className="validation">{error}</div>}
      </form>
    </div>
  );
};

export default EditChannelModal;
