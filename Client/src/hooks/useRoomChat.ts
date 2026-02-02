import { useEffect, useMemo, useState } from "react";
import { useSocket } from "./useSocket";
import { User } from "@/types/api/user";
import { Message } from "@/types/ui/chat.types";

export const useRoomChatCombinedItems = (messages: Message[]) => {
  return useMemo(() => {
    return messages.map((msg) => ({ ...msg, type: "message" as const }));
  }, [messages]);
};

export const useRoomMessageHandling = (
  locationId: number,
  user: User | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const [newMessage, setNewMessage] = useState("");
  const { joinLocationRoom, leaveLocationRoom, sendMessage, onMessage } =
    useSocket();

  useEffect(() => {
    joinLocationRoom(locationId);

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    onMessage(handleNewMessage, "location");

    return () => {
      leaveLocationRoom(locationId);
    };
  }, [locationId, joinLocationRoom, leaveLocationRoom, onMessage, setMessages]);

  const handleSendMessage = (
    e: React.FormEvent | React.KeyboardEvent,
    attachments?: any[]
  ) => {
    e.preventDefault();

    if (user) {
      sendMessage(locationId, newMessage.trim(), attachments, "location");
      setNewMessage("");
    }
  };

  return {
    newMessage,
    setNewMessage,
    handleSendMessage,
  };
};
