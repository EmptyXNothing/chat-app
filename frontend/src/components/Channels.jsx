import '../styles/App.css';
import Channel from './Channel';
import AddIcon from '../assets/add.svg';
import { useChannelStore } from '../store/channelStore';
import { useModalStore } from '../store/modalStore';
import { useState, useEffect } from 'react';

const Channels = () => {
  const { openModal } = useModalStore();
  const { channels } = useChannelStore();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="open-chats-btn" onClick={() => setIsOpen(true)}>
          Открыть чаты
        </button>
      )}

      {(!isMobile || isOpen) && (
        <div className={`channels ${isMobile ? 'channels-mobile' : ''}`}>
          <div className="channels-header">
            <h3>Channels</h3>
            <button onClick={() => openModal('addChannel')}>
              <img src={AddIcon} alt="add channel" />
            </button>
            {isMobile && (
              <button className="close-chats-btn" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            )}
          </div>
          {channels.map((channel) => (
            <Channel channel={channel} key={channel.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default Channels;
