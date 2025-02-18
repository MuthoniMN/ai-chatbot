import { useEffect, useState, ReactNode } from "react";
import { TextContext } from "./";
import { TChat, TMessage } from "../types/";
import { initDB, add, list, getMessages, Stores } from "../db/";

export default function TextContextProvider(
  { children } : { children: ReactNode }
){
  const [chats, setChats] = useState<TChat[]>([]);
  const [chat, setChat] = useState<TChat>({} as TChat);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  useEffect(() =>  {
    const initializeDB = async () => {
      const status = await initDB();
      setDbConnected(status);
    }
      initializeDB();
  }, []);

  useEffect (() => {
    let savedChats: TChat[];
    let chat: TChat;
    let chatMessages: TMessage[];

    const getData = async () => {
      savedChats = await list(Stores.Chats) as TChat[];
      console.log(savedChats);

      if(savedChats.length <= 0){
        const newChat: TChat = {
          title: "Chat #1",
          created_at: new Date()
        }
        await add(Stores.Chats, newChat) as TChat;
        
        savedChats = await list(Stores.Chats) as TChat[];
        chat = savedChats[0];
        console.log(savedChats);
        setChats(savedChats);
      }

      chat = savedChats[0];
      console.log(chat);
      chatMessages = await getMessages(chat.id as number) as TMessage[];
      console.log(chatMessages);
      
      setChat(chat);
      setMessages(chatMessages);
    }

    getData();
  }, []);

  if(dbConnected) console.log('DB connected!');

  return (
    <TextContext.Provider value={{chats, messages, setChats, setMessages, chat, setChat}}>
      {children}
    </TextContext.Provider>
  )
}
