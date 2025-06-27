import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import App from './components/App.jsx'
import store from './slices/index.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store ={store}>
      <App />
    </Provider>
  </StrictMode>,
)
