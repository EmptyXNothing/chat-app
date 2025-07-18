import '../styles/App.css';
import { closeModal } from '../slices/modalSlice';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

const ModalWindow = () => {
  const dispatch = useDispatch()
  const { visible } = useSelector((state) => state.modal)
  return (
    <div className="modal">
      <Modal
        isOpen={visible}
        onRequestClose={() => dispatch(closeModal())}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={() => dispatch(closeModal())}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default ModalWindow;
