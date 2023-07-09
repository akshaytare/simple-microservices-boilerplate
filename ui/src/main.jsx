import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';
import { KeycloakProvider } from './KeycloakProvider';

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <KeycloakProvider>
        <App />
      </KeycloakProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
