import { useContext } from "react";
import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import { Link } from "react-router";
import { TextContext } from "../context/";
import { TTextContext } from "../types/";

export default function Index(){
  const { error } = useContext(TextContext) as TTextContext;
  return (
    <section className="w-screen h-screen flex justify-center items-center px-8">
    <section className="p-6 bg-[#2b2b31ff] text-[#fafafa] rounded-xl mx-auto flex flex-col gap-6 justify-center items-center">
      <h1 className="text-center text-3xl font-bold">Welcome to HelperTextAI</h1>
      <ul className="w-full min-w-[300px] max-w-[650px]space-y-4">
        <li className="flex gap-2 items-center justify-center"> <FaCheck className="text-lg text-emerald-600" />Summarize blocks of text</li>
        <li className="items-center text-wrap"> 
        <p className="flex gap-2 items-center justify-center text-center"><FaCheck className="text-lg text-emerald-600" />Translate text to the following languages:</p>
          <ul className="block w-full px-6">
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />English</li>
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />Portuguese</li>
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />Spanish</li>
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />Russian</li>
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />Turkish</li>
            <li className="flex gap-2 items-center flex-wrap justify-center"> <FaCheckDouble className="text-lg text-emerald-300" />French</li>
          </ul>
        </li>
        <li className="flex gap-2 items-center justify-center"> <FaCheck className="text-lg text-emerald-600" />Identify the text's language</li>
      </ul>
      <Link to="/chat">
        <button className="py-2 px-6 bg-slate-200 text-slate-950 transition-all ease-in-out duration-400 hover:font-bold hover:bg-slate-400 hover:text-white rounded-md">Get Started!</button>
      </Link>
      {error && <p className="bg-red-300 text-red-700 p-2 font-bold">{error}</p>}
    </section>
    </section>
  );
}
