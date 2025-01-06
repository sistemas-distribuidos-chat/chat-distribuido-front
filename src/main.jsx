import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
