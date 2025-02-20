import { Routes, Route } from "react-router";
import Chat from "./pages/Chat";
import TextContextProvider from "./context/TextContext";


function App() {
  return (
    <TextContextProvider>
    <Routes>
      <Route path={'/'} element={<Chat />} />
    </Routes>
    </TextContextProvider>
  )
}

export default App
