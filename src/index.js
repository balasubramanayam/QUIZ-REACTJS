// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './State/Store'; 
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist'; 

// const persistor = persistStore(store);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor} loading={null}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import store, { persistor } from './State/Store'; 
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
