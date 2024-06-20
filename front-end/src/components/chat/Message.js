import React from "react";
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

const Message = React.forwardRef(
  ({ isSender, content, id, onContextMenu }, ref) => (
    <MessageItem
      isSender={isSender}
      onContextMenu={onContextMenu}
      ref={ref}
      id={`message-${id}`}
    >
      <div className="message-bubble">
        {content}
        {isSender && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "15px", margin: "5px 0px 0px 5px" }}
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M4 12.6111L8.92308 17.5L20 6.5"
                stroke="#f0f0f0"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
        )}
      </div>
    </MessageItem>
  )
);

export default Message;
