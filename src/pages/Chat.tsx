import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { TextContext } from "../context/";
import Message from "../components/Message";
import { TMessage, TTextContext } from "../types/";
import Summarize from "../components/Summarize";
import Translate from "../components/Translate";

export default function Chat() {
  const { chat,  messages } = useContext(TextContext) as TTextContext;
  return (
    <section>
      <Sidebar />
      <section className="w-[100vw] h-[100vh] flex flex-col justify-between items-center py-4 px-6 -z-10">
      <h2 className="text-3xl font-bold">{chat.title}</h2>  
      <section className="h-full w-full overflow-y-auto scroll-smooth" >
      <section className="flex-1 w-full overflow-y-auto flex flex-col gap-4 items-end justify-end mb-4">
        {messages && messages.map((message: TMessage, index: number) => (
          <div className={`w-full md:w-1/2 max-w-[450px] py-2 px-4 rounded-lg space-y-4 ${message.type == 'input' ? 'bg-gray-300 text-right':'bg-gray-600 text-white text-left self-start'}`} key={message.id}>
            <p>{message.message}</p>
            {message.type == 'input' && message.message.length >= 150 && message.language == "English" && (<Summarize message={message.message} />)}
            {message.type == 'input' && (<Translate language={message.language} message={message.message} />)}
            {message.type == 'output' && messages[index-1].language != message.language && <p>Translated to: {message.language}</p>}
          </div>
        ))}
      </section>
      </section>
      <Message />
      </section>
    </section>
  );
}
