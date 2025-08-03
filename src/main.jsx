import { Provider } from 'jotai';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import SocketManager from '@/components/common/SocketManager';
import '@/styles/main.scss';

createRoot(document.getElementById('root')).render(
  <Provider>
    <BrowserRouter>
      <SocketManager />
      <App />
    </BrowserRouter>
  </Provider>,
);
