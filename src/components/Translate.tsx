import { useState, useContext } from "react";
import { TLang, AI, AITool, TTextContext, TMessage } from "../types/";
import { add, getMessages, Stores } from "../db/";
import { TextContext } from "../context/";

export default function Translate({ language, message }: {
  language: string,
  message: string,
}){
  const { chat, setMessages } = useContext(TextContext) as TTextContext;
  const languages: TLang = {
    'en': 'English',
    'pt': 'Portuguese',
    'es': 'Spanish',
    'ru': 'Russian',
    'tr': 'Turkish',
    'fr': 'French'
  }

  const shorthandLang = Object.keys(languages).find(key => languages[key] === language)

  const [target, setTarget ] = useState('');
  const [loading, setLoading ] = useState(false);
  const handleTranslate = async (e) => {
    e.preventDefault();
    if ('ai' in self && 'languageDetector' in (self.ai as AI)){
      console.log(shorthandLang, target);
        const translator = await ((self.ai as AI).translator as AITool).create({
          sourceLanguage: shorthandLang,
          targetLanguage: target,
          monitor(m) {
            m.addEventListener('downloadprogress', (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes`);
            });
          }
        });

        const newMessage = await translator.translate(message);
        console.log(newMessage);

        if(newMessage){
          const data = {
            message: newMessage as string,
            type: 'output',
            chat_id: chat.id,
            created_at: new Date,
            language: languages[target]
          } as TMessage;

          await add(Stores.Messages, data);
          const messages = await getMessages(chat.id as number);
          setMessages(messages as TMessage[]);
        }
    }
  }
  return (
    <form className="space-y-2" onSubmit={handleTranslate}>
      <div className="w-full flex justify-between items-center">
        <label htmlFor="language">Translate to: </label>
        <select className="border-[2px] border-gray-600 w-[75%] p-2" value={target} onChange={(e) => setTarget(e.target.value)}>
          {
            Object.keys(languages).map(lang => languages[lang] != language && (
              <option key={lang} value={lang}>{languages[lang]}</option>
            ))
          }
        </select>
      </div>
      <button className={`bg-white border-[1px] border-gray-500 p-2 rounded-md hover:border-[2px] hover:font-bold transition-all ease-in-out duration-400 ${loading && 'bg-gray-400'}`} type="submit" disabled={loading}>
      {loading ? (
        <>
          <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24">
          </svg>
          Translating…
        </>
      ): 'Translate'}
      </button>
    </form>
  );
}
