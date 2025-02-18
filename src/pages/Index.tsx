import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import { Link } from "react-router";

export default function Index(){
  return (
    <section className="px-6 w-screen h-screen flex flex-col gap-6 justify-center items-center">
      <h1 className="text-center">Welcome to HelperTextAI</h1>
      <ul className="w-full max-w-[650px]">
        <li className="flex gap-2 items-center"> <FaCheck className="text-lg text-emerald-600" />Summarize blocks of text</li>
        <li className="flex gap-2 items-center flex-wrap"> <FaCheck className="text-lg text-emerald-600" />Translate text to the following languages:
          <ul className="block w-full px-6">
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />English</li>
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />Portuguese</li>
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />Spanish</li>
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />Russian</li>
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />Turkish</li>
            <li className="flex gap-2 items-center flex-wrap"> <FaCheckDouble className="text-lg text-emerald-300" />French</li>
          </ul>
        </li>
        <li className="flex gap-2 items-center"> <FaCheck className="text-lg text-emerald-600" />Identify the text's language</li>
      </ul>
      <Link to="/chat">
        <button className="py-2 px-6 bg-gray-700 text-white transition-all ease-in-out duration-400 hover:font-bold hover:bg-gray-800 rounded-md">Get Started!</button>
      </Link>
    </section>
  );
}
