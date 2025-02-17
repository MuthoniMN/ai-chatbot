import { useEffect, useState, ReactNode } from "react";
import { TextContext } from "./";
import { TChat, TMessage } from "../types/";
import { initDB } from "../db/";

export default function TextContextProvider(
  { children } : { children: ReactNode }
){
  const [chats, setChats] = useState<TChat[]>([]);
  const [chat, setChat] = useState<TChat|null>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [dbConnected, setDbConnected] = useState<boolean>(false);

  useEffect(() =>  {
    const initializeDB = async () => {
      const status = await initDB();
      setDbConnected(status);
    }
      initializeDB();
  }, []);

  if(dbConnected) console.log('DB connected!');

  return (
    <TextContext.Provider value={{chats, messages, setChats, setMessages}}>
      {children}
    </TextContext.Provider>
  )
}
