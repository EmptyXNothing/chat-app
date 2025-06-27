import '../styles/App.css';

const Channel = (props) => {
  const { channel } = props

  return (
    <div className="channel">
      {channel.name}
    </div>
  );
};

export default Channel;
