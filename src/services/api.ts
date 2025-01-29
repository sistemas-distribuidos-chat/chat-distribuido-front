import axios from "axios";
import { parseCookies } from 'nookies';

interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const BASE_API = import.meta.env.VITE_REACT_APP_API_URL;

export const urls = {
  url: `${BASE_API}/api`,
};

const { token } = parseCookies();

const api = axios.create({
  baseURL: urls.url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
