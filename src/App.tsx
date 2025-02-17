import { Routes, Route } from "react-router";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import About from "./pages/About";
import TextContextProvider from "./context/TextContext";


function App() {
  return (
    <TextContextProvider>
    <Routes>
      <Route path={'/'} element={<Index />} />
      <Route path={'/about'} element={<About />} />
      <Route path={'/chat'} element={<Chat />} />
    </Routes>
    </TextContextProvider>
  )
}

export default App
