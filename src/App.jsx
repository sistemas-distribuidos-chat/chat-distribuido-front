import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../theme";
import SidebarLayout from "./components/SidebarLayout"; // Layout com barra lateral
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatContacts from "./components/ChatContacts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* Rotas sem barra lateral */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rotas com barra lateral */}
          <Route element={<SidebarLayout />}>
            <Route path="/chats" element={<ChatList />} />
            <Route path="/chat/:id" element={<ChatWindow />} />
            <Route path="/contatos" element={<ChatContacts />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
