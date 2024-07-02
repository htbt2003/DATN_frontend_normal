import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { persistor, store } from "./redux/stores";
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GoogleOAuthProvider clientId="846652607097-2rd6g3a575rg7bvik33tcdcs5pra4snc.apps.googleusercontent.com">
          <PayPalScriptProvider options={{ "client-id": "AazrjtchBSK_-2Uq6K7RazBDeKj6HshpQKVHPnwnSi9jS4z6m0E2kZZc5htStiXYrN6Q_ErrezaKNQpl" }}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PayPalScriptProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
