import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { TextContext } from "../context/";

export default function Chat() {
  const { chat, setChat, messages, setMessages } = useContext(TextContext);
  return (
    <section>
      <Sidebar />
      <h1>{chat.title}</h1>
    </section>
  );
}
