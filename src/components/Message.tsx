import { useContext, useState, useEffect, FormEvent } from "react";
import { TextContext } from "../context/";
import { TMessage, TTextContext, AILanguageDetectorType } from "../types/";
import { add, getMessages, Stores } from "../db/";
import { getLanguage } from "../utils/language";
import { IoIosSend, IoIosWarning } from "react-icons/io";

export default function Message(){
  const { chat, setMessages, error, setError } = useContext(TextContext) as TTextContext;
  const [newMessage, setNewMessage] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const detect = async () => {
      let detector;
      setError('');
      if ('ai' in self && 'languageDetector' in self.ai){
        const languageDetectorCapabilities = await self?.ai?.languageDetector.capabilities();
        const canDetect = languageDetectorCapabilities.available;

        if(canDetect == 'no') {
          setError('Failed to run language detector!');
          return;
        }else if(canDetect === 'readily'){
          detector = await self?.ai?.languageDetector.create() as AILanguageDetectorType;
        }else {
          detector = await self?.ai?.languageDetector.create({
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes`);
              })
            },
          }) as AILanguageDetectorType;

          await detector.ready;
        }

        const lang = await detector.detect(newMessage);
        if(lang[0]) setLanguage(getLanguage(lang[0].detectedLanguage as string));
      } else {
        setError('Your browser does not support Language Detection');
      }
    }

    detect();
  }, [newMessage]);

  const handleSubmit = async (e: FormEvent) => {
    if(newMessage.length < 1) {
      setError('Your text is too short');
      return;
    }
    e.preventDefault();
    const data = {
      chat_id: chat.id,
      message: newMessage,
      type: 'input',
      language,
      created_at: new Date()
    } as TMessage;

    await add(Stores.Messages, data);
    const messages = await getMessages(chat.id as number);
    console.log(messages);

    setMessages(messages as TMessage[]);
    setNewMessage('');
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Message Form">
      {error && <p aria-label="Error Message" id="error" className="bg-red-300 text-red-700 p-2 my-2 font-bold flex gap-2 items-center"><IoIosWarning className="text-xl" /> {error}</p>}
      <div className="flex gap-4 items-center">
      <div className="space-y-2">
      <textarea aria-label="Message Box" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="w-[75vw] border-gray-800 border-[1px] py-2 px-4 rounded-lg z-10" rows={3} cols={10} aria-describedby="error"></textarea>
      {language && (<p className="text-sm text-black">Written in: <span className="font-bold">{language}</span></p>)}
      </div>
      <button type="submit" className="bg-gray-800 text-[#fafafa] hover:font-bold hover:text-white transition-all ease-in-out duration-400 w-[50px] h-[50px] rounded-full flex justify-center items-center text-2xl" aria-label="Send Message Button">
        <IoIosSend />
      </button>
      </div>
    </form>
  );
}
