import styled from "styled-components";

const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  justify-content: ${(props) => (props.isSender ? "flex-end" : "flex-start")};

  .message-bubble {
    background-color: ${(props) =>
      props.isSender
        ? "var(--accent)"
        : "#f0f0f0"}; /* Conditional background color */
    color: ${(props) =>
      props.isSender ? "white" : "black"}; /* Conditional text color */
    margin-left: ${(props) => (props.isSender ? "10px" : "0")};
    margin-right: ${(props) => (props.isSender ? "0" : "10px")};
    padding: 8px 12px;
    border-radius: 15px;
    max-width: 70%; /* Limit bubble width for better readability */
  }
`;

const Message = ({ isSender, content, onContextMenu }) => (
  <MessageItem isSender={isSender} onContextMenu={onContextMenu}>
    <div className="message-bubble">{content}</div>
  </MessageItem>
);

export default Message;
