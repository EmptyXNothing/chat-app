import Modal from 'react-modal';
import { useModalStore } from '../../store/modalStore.js';
import AddChannelModal from './AddChannel.jsx';
import EditChannelModal from './EditChannel.jsx';
import '../../styles/Modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    maxWidth: '500px',
    minWidth: '350px',
    bottom: 'auto',
    marginRight: '-50%',
    width: '50vw',
    zIndex: '1001',
    transform: 'translate(-50%, -50%)',
    border: '3px solid #525252'
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
        return <AddChannelModal handleClose={handleClose} />;
      case 'editChannel':
        return <EditChannelModal handleClose={handleClose} />;
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
      </div>
    </Modal>
  );
};

export default ModalWindow;
