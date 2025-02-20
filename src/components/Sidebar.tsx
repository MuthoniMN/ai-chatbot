import { useState, useContext } from "react";
import { FaBars, FaBarsStaggered, FaPlus } from "react-icons/fa6";
import { TextContext } from "../context/";
import { TChat, TTextContext } from "../types/";
import { add, list, Stores } from "../db/";

export default function Sidebar(){
  const [toggle, setToggle] = useState(false);
  const [create, setCreate] = useState(false);
  const { chats, setChat, setChats } = useContext(TextContext) as TTextContext;
  const [title, setTitle] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    const newChat = {
      title,
      created_at: new Date()
    } as TChat;

    await add(Stores.Chats, newChat);
    const chatList = await list(Stores.Chats) as TChat[];
    setChats(chatList);
    setChat(chatList[chatList.length - 1]);
    setCreate(false);
  }
  return (
    <div>
      <button className={`bg-white border-[1px] border-gray-500 p-2 rounded-md absolute ${toggle ? 'top-4 left-[210px]' : 'top-4 left-4'} transition-all ease-in-out duration-400 text-gray-800`} onClick={() => setToggle(tog => !tog)}>
        {toggle ? ( <FaBarsStaggered /> ) : ( <FaBars /> ) }
      </button>
        <div className={`${toggle ? 'translate-x-0' : '-translate-x-[200px]'} absolute top-0 h-screen py-2 px-4 w-[200px] bg-gray-600 text-white transition-all ease-in-out duration-500 flex flex-col justify-between`}>
          <nav>
            <ul className="divide-y-2 divide-[#fafafa] max-h-[400px] overflow-y-auto overscroll-contain">
            { chats.map((chat: TChat) => (
              <li 
                className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400"
                onClick={() => setChat(chat)}
                key={chat.id}
              >{chat.title}</li>
            ))
            }
            </ul>
          </nav>
          <div>
            <button className="flex gap-2 items-center bg-[#f5f5f5] text-gray-700 hover:font-bold hover:bg-white py-2 px-4 rounded-md transition-all ease-in-out duration-200" onClick={() => setCreate(true)} disabled={create}>
              <FaPlus />
              <span>Create Chat</span>
            </button>
            { create && (<form onSubmit={handleAdd}>
              <div className="py-2 flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className="border-[1px] border-[#fafafa] rounded-md p-2" onChange={(e) => setTitle(e.target.value)} />
              </div>
              <button type="submit" className="flex gap-2 items-center bg-[#f5f5f5] text-gray-700 hover:font-bold hover:bg-white py-2 px-4 rounded-md transition-all ease-in-out duration-200">Add Chat</button>
            </form>) }
          </div>
        </div>
    </div>
  );
}
