import '../styles/App.css';
import { closeModal } from '../slices/modalSlice';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../Contexts/UserProvider.jsx';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector((state) => state.modal);
  const [input, setInput] = useState('');
  const { headers } = useContext(UserContext);

  const handleInput =  (e) => {
    setInput(() => e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChannel = { name: input };
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: headers,
    });
    setInput(() => '');
    dispatch(closeModal())
  };

  const handleClose = () => {
    setInput(() => '');
    dispatch(closeModal());
  }

  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => handleClose()}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal">
        <div className="channel-name-form">
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
        <button onClick={() => handleClose()}>close</button>
      </div>
    </Modal>
  );
};

export default ModalWindow;
