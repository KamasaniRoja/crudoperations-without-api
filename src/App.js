import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import Appbar from './components/Appbar';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Appbar />
      </Provider>
    </>
  );
}

export default App;
