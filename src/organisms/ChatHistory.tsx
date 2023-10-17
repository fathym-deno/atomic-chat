import { JSX } from "preact";
import { ChatBox } from "../molecules/ChatBox.tsx";

export type ChatHistoryMessage = {
  Color: string;

  Content: string;

  Icon: JSX.Element;

  JustifyEnd?: boolean;

  Timestamp: Date;
};

export type ChatHistoryProps = {
  messages: ChatHistoryMessage[];
};

export function ChatHistory(props: ChatHistoryProps) {
  return (
    <>
      {props.messages.map((message, index) => {
        return (
          <ChatBox
            key={index}
            color={message.Color}
            content={message.Content}
            icon={message.Icon}
            justifyEnd={message.JustifyEnd}
            timestamp={message.Timestamp!}
          />
        );
      })}
    </>
  );
}
