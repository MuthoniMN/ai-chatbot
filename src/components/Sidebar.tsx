import { useState } from "react";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";

export default function Sidebar(){
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <button className={`bg-white border-[1px] border-gray-500 p-2 rounded-md absolute ${toggle ? 'top-4 left-[210px]' : 'top-4 left-4'} transition-all ease-in-out duration-400`} onClick={() => setToggle(tog => !tog)}>
        {toggle ? ( <FaBarsStaggered /> ) : ( <FaBars /> ) }
      </button>
      {toggle && (
        <div className={`${toggle ? 'block' : 'hidden'} absolute top-0 h-screen py-2 px-4 w-[200px] bg-gray-600 text-white divide-y-2 divide-[#fafafa] transition-all ease-in-out duration-400`}>
          <nav>
            <ul className="divide-y-2 divide-[#fafafa] max-h-[400px] overflow-y-auto overscroll-contain">
              <li className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400">Chat #1</li>
              <li className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400">Chat #1</li>
              <li className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400">Chat #1</li>
              <li className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400">Chat #1</li>
              <li className="py-2 hover:underline hover:font-bold transition-all ease-in-out duration-400">Chat #1</li>
            </ul>
          </nav>
        </div>
      ) }
    </div>
  );
}
