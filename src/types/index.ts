import { Dispatch, SetStateAction } from 'react';

export type TChat = {
  id?: number,
  title: string,
  created_at: Date,
}

export type TMessage = {
  id?: number,
  chat_id: number,
  message: string,
  response: string,
  created_at: Date
}

export type TTextContext = {
  chats: TChat[],
  chat: TChat,
  setChats: Dispatch<SetStateAction<TChat[]>>,
  setChat: Dispatch<SetStateAction<TChat>>,
  messages: TMessage[],
  setMessages: Dispatch<SetStateAction<TMessage[]>>
}
