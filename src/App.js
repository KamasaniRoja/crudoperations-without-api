import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import Appbar from './components/Appbar';
import store from './store';
import { AuthProvider } from './contexts/JWTContext';

function App() {
  return (
    <>

      <Provider store={store}>
        <AuthProvider>
          <Appbar />
        </AuthProvider>
      </Provider>

    </>
  );
}

export default App;
