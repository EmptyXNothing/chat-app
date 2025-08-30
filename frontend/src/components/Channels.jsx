import "../styles/App.css";
import Channel from "./Channel";
import { openModal } from "../slices/modalSlice";
import { useDispatch } from "react-redux";
import AddIcon from "../assets/add.svg";
import { useChannelStore } from "../store/channelStore";

const Channels = ({ deleteChannel }) => {
  const dispatch = useDispatch();
  const { channels } = useChannelStore();

  return (
    <div className="channels">
      <div className="channels-header">
        <h3>Channels</h3>
        <button onClick={() => dispatch(openModal({ type: "addChannel" }))}>
          <img src={AddIcon} alt="add channel" />
        </button>
      </div>
      {channels.map((channel) => (
        <Channel
          channel={channel}
          deleteChannel={deleteChannel}
        />
      ))}
    </div>
  );
};

export default Channels;
