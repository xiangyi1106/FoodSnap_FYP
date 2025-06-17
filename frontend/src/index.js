import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./styles/icons/icons.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from "react-redux";
import rootReducer from './reducers';
import '@fontsource/geist-sans';

const store = createStore(rootReducer, composeWithDevTools());

//npm install @reduxjs/toolkit
// import { configureStore } from '@reduxjs/toolkit';

// // Configure the store using Redux Toolkit's configureStore method
// const store = configureStore({
//   reducer: rootReducer,
//   devTools: true // Enable Redux DevTools extension
// });


//Wrap the app into strict mode: React 18 new format
//use correct ID of root element
//this is the ID of the div in index.html file
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
