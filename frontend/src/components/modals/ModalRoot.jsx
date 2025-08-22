import { closeModal } from '../../slices/modalSlice.js';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import AddChannelModal from './AddChannel.jsx';
import EditChannelModal from './EditChannel.jsx';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    height: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalWindow = () => {
  const dispatch = useDispatch();
  const { visible, type } = useSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const getCurrentModal = () => {
    switch (type) {
      case 'addChannel':
        return <AddChannelModal />;
      case 'editChannel':
        return <EditChannelModal />;
      default:
        return null
    }
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => handleClose()}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="modal">
        {getCurrentModal()}
        <button onClick={() => handleClose()}>close</button>
      </div>
    </Modal>
  );
};

export default ModalWindow;
