import Modal from 'react-modal';
import { useModalStore } from '../../store/modalStore.js';
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
  const { modal, closeModal } = useModalStore();

  const handleClose = () => {
    closeModal();
  };

  const getCurrentModal = () => {
    switch (modal.type) {
      case 'addChannel':
        return <AddChannelModal />;
      case 'editChannel':
        return <EditChannelModal />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={modal.visible}
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
