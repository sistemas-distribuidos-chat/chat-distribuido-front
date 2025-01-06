import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/chat/:id" element={<ChatWindow />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
