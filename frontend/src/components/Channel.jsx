import "../styles/App.css";
import { useDispatch } from "react-redux";
import EditIcon from "../assets/edit.svg";
import DeleteIcon from "../assets/delete.svg";
import { openModal } from "../slices/modalSlice";
import { useChannelStore } from "../store/channelStore";
import axios from "axios";
import { useCallback } from "react";
import { useUser } from "../hooks/useUser";

const Channel = ({ channel }) => {
  const { headers } = useUser();
  const dispatch = useDispatch();
  const { currentChannel, setCurrentChannel, setFirstChannel } = useChannelStore();
  const style = channel.id === currentChannel?.id ? "current channel" : "channel";

  const deleteChannel = useCallback(
    async (channel) => {
      try {
        if (channel.removable) {
          await axios.delete(`/api/v1/channels/${channel.id}`, { headers });
          if (currentChannel?.id === channel.id) {
            setFirstChannel()
          }
        } else {
          console.log('Нельзя удалить канал');
        }
      } catch (e) {
        console.log(e);
      }
    },
    [currentChannel, headers]
  );

  return (
    <div className={style}>
      <div
        className="channel-name"
        onClick={() => {
          setCurrentChannel(channel);
        }}
      >
        <span>
          {channel.name.length > 7
            ? channel.name.slice(0, 7) + "..."
            : channel.name}
        </span>
      </div>
      <div className="channel-buttons">
        <button
          onClick={() =>
            dispatch(openModal({ type: "editChannel", data: channel }))
          }
        >
          <img src={EditIcon} alt="edit channel" />
        </button>
        <button onClick={async () => await deleteChannel(channel)}>
          <img src={DeleteIcon} alt="delete channel" />
        </button>
      </div>
    </div>
  );
};

export default Channel;
