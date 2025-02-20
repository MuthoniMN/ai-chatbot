import { useState, useContext } from "react";
import { AI, AITool, TMessage, Monitor, TTextContext } from "../types/";
import { TextContext } from "../context/";
import { add, getMessages, Stores } from "../db/";

export default function Summarize({ message }: {
  message: string,
}){
  const [summary, setSummary] = useState('');
  const { setError, chat, setMessages, setLoading } = useContext(TextContext) as TTextContext;
  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      // Check if `self.ai` and `summarizer` exist
      if ('ai' in self && 'summarizer' in (self.ai as AI)) {
        const canSummarize = await self.ai.summarizer.capabilities();
        let summarizer;
        if (canSummarize && canSummarize.available !== 'no') {
          if (canSummarize.available === 'readily') {
            // The summarizer can immediately be used.
            summarizer = await self.ai.summarizer.create();
          } else {
            // The summarizer can be used after the model download.
            summarizer = await self.ai.summarizer.create();
            summarizer.addEventListener('downloadprogress', (e) => {
              console.log(e.loaded, e.total);
            });
            await summarizer.ready;
          }
        } 

        // Summarize the message
        const summ = await summarizer.summarize(message);
        console.log(summ);
        setSummary(summ);

        const data = {
          chat_id: chat.id,
          message: summ,
          created_at: new Date(),
          type: 'output',
          language: 'English'
        } 

        await add(Stores.Messages, data as TMessage);

        const messages = await getMessages(chat.id as number);
        setMessages(messages as TMessage[]);

      } else {
        setError('Summarizer is not available in your browser!');
      }
      setLoading(false);
    } catch (e) {
      setError('Failed to summarize text');
      console.error('Error in handleSummarize:', e);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleSummarize} className="bg-gray-800 text-[#fafafa] hover:font-bold hover:text-white transition-all ease-in-out duration-400 py-2 px-4 rounded-lg mt-2">Summarize Text</button>
  );
}
