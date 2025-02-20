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
  const [loading, setLoading ] = useState(false);
  const [valid, setValid ] = useState(true);
  const [error, setError] = useState('');

  useEffect(() =>  {
    const initializeDB = async () => {
      const status = await initDB();
      setDbConnected(status);
    }
      initializeDB();

    if (!('ai' in self && 'languageDetector' in self.ai && 'translator' in self.ai && 'summarizer' in self.ai)){
      setError('Your browser is not set up to run these features. Please switch to Chrome');
      setValid(false);
    }

  }, []);

  useEffect (() => {
    let savedChats: TChat[];
    let chat: TChat;
    let chatMessages: TMessage[];

    const getData = async () => {
      savedChats = await list(Stores.Chats) as TChat[];

      if(savedChats.length <= 0){
        const newChat: TChat = {
          title: "Chat #1",
          created_at: new Date()
        }
        await add(Stores.Chats, newChat) as TChat;
        
        savedChats = await list(Stores.Chats) as TChat[];
      }

      const currentChat = Number(localStorage.getItem('chatId'))

      setChats(savedChats);

      chat = currentChat ? savedChats[currentChat] : savedChats[0];
      chatMessages = await getMessages(chat.id as number) as TMessage[];
      
      setChat(chat);
      setMessages(chatMessages);
    }

    getData();
  }, []);

  useEffect(() => {
    const fetchUpdate = async() => {
      const update = await getMessages(chat.id as number) as TMessage[];
      setMessages(update);
    }
    const saved = localStorage.getItem('chatId');
    if(Number(saved) != (chat.id as number)) localStorage.setItem('chatId', `${chat.id as number}`)

    fetchUpdate();
  }, [chat]);

  if(dbConnected) console.log('DB connected!');

  return (
    <TextContext.Provider value={{chats, messages, setChats, setMessages, chat, setChat, error, setError, loading, setLoading, valid, setValid}}>
      {children}
    </TextContext.Provider>
  )
}
