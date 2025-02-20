import { useState, useContext, FormEvent } from "react";
import { TLang, TTextContext, TMessage } from "../types/";
import { add, getMessages, Stores } from "../db/";
import { TextContext } from "../context/";

export default function Translate({ language, message }: {
  language: string,
  message: string,
}){
  const { chat, setMessages, setError, loading, setLoading } = useContext(TextContext) as TTextContext;
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
  const handleTranslate = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try{
      if ('ai' in self && 'languageDetector' in self.ai){
        const translatorCapabilities = await self?.ai?.translator.capabilities();
        const available = translatorCapabilities.languagePairAvailable(shorthandLang as string, target);
        let translator;
        if(available === 'after-download'){
          translator = await self?.ai?.translator.create({
            sourceLanguage: shorthandLang as string,
            targetLanguage: target,
            monitor(m) {
              m.addEventListener('downloadprogress', (e) => {
                console.log(`Downloaded ${e.loaded} of ${e.total} bytes`);
              });
            }
          });
        }else if(available === 'readily'){
          translator = await self?.ai?.translator.create({
            sourceLanguage: shorthandLang as string,
            targetLanguage: target,
          });
        }else if(available === 'no'){
          setError(`Sorry! Can't translate from ${languages[shorthandLang as string]} to ${languages[target]}`);
          setLoading(false);
          return;
        }

          const newMessage = await translator?.translate(message);

          if(newMessage){
            const data = {
              message: newMessage as string,
              type: 'output',
              action: 'translate',
              chat_id: chat.id,
              created_at: new Date,
              language: languages[target]
            } as TMessage;

            await add(Stores.Messages, data);
            const messages = await getMessages(chat.id as number);
            setMessages(messages as TMessage[]);
            setLoading(false);
          }
      }else {
        setError('Your browser does not support Translation');
        setLoading(false);
      }
    }catch(e){
      console.error(e);
      setError('Failed to translate text');
      setLoading(false);
    }
  }
  return (
    <form className="w-full" onSubmit={handleTranslate}>
      <div className="w-full flex gap-2 justify-between items-center">
        <select className="border-[2px] border-gray-600 w-[75%] p-2" value={target} onChange={(e) => setTarget(e.target.value)}>
        <option>--Select Language--</option>
          {
            Object.keys(languages).map(lang => languages[lang] != language && (
              <option key={lang} value={lang}>{languages[lang]}</option>
            ))
          }
        </select>

      <button className={`bg-white border-[1px] border-gray-500 p-2 rounded-md hover:border-[2px] hover:font-bold transition-all ease-in-out duration-400 ${loading && 'bg-gray-400'}`} type="submit" disabled={loading}>
        Translate
      </button>
      </div>
    </form>
  );
}
