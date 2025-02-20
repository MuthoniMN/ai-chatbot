import Sidebar from "../components/Sidebar";
import { useContext, useRef, useEffect } from "react";
import { TextContext } from "../context/";
import Message from "../components/Message";
import { TMessage, TTextContext } from "../types/";
import Summarize from "../components/Summarize";
import Translate from "../components/Translate";
import { FaUser, FaRobot } from "react-icons/fa";

export default function Chat() {
  const { chat,  messages, loading } = useContext(TextContext) as TTextContext;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading]);

  return (
    <section>
      <Sidebar />
      <section className="w-[100vw] h-[100vh] flex flex-col justify-between items-center gap-6 py-4 px-6 -z-10">
      <h2 className="text-3xl font-bold">{chat.title}</h2>  
      <section className="h-full w-full overflow-y-auto scroll-smooth" >
      <section className="flex-1 w-full overflow-y-auto flex flex-col gap-4 items-end justify-end mb-4">
        {messages && messages.map((message: TMessage, index: number) => (
          <div className={`w-full md:w-1/2 max-w-[450px] py-2 px-4 rounded-lg space-y-4 ${message.type == 'output' && 'self-start'}`} key={message.id}>
          <div className={`flex gap-2 justify-between w-full ${message.type == 'input' ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`w-10 h-10 rounded-full bg-[#2b2b31ff] text-white flex items-center justify-center`}>
          {
            message.type == 'input' ?
              <FaUser className="text-xl" />
            : <FaRobot className="text-xl" />
          }
          </div>
          <div className="flex flex-col w-full items-end gap-2">
            <p className={`w-full py-2 px-4 rounded-lg space-y-4 ${message.type == 'input' ? 'bg-gray-300 text-right':'bg-gray-600 text-white text-left self-start'}`}>{message.message}</p>
            {message.type == 'input' && message.message.length >= 150 && message.language == "English" && (<Summarize message={message.message} />)}
            {message.type == 'input' && (<Translate language={message.language} message={message.message} />)}
            {message.type == 'output' && <p className="text-sm italic">{message?.action == 'translate' ? `Translated to: ${message.language}` : message?.action == 'summarize' ? "Summarized" : ""}</p>}
            </div>
          </div>
          </div>
        ))}
        { messages.length == 0 && (
          <section className="w-full h-[60vh] flex items-center justify-center">
            <h2 className="text-lg font-bold italic">Send a message to start interacting with the application.</h2>
          </section>)
        }
        {
          loading && (
        <div className="self-start w-full max-w-sm rounded-md bg-gray-600 p-4">  
            <div className="flex animate-pulse space-x-4">    
              <div className="size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500"><FaRobot className="text-xl" /></div>    
              <div className="flex-1 space-y-6 py-1">      
                <div className="h-2 rounded bg-gray-200"></div>      
                <div className="space-y-3">        
                <div className="grid grid-cols-3 gap-4">          
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>          
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>        
              </div>        
              <div className="h-2 rounded bg-gray-200"></div>      
            </div>    
          </div>  
        </div>
      </div>
          )
        }
        <div ref={messagesEndRef} />
      </section>
      </section>
      <Message />
      </section>
    </section>
  );
}
