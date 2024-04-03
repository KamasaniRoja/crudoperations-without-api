import React from "react";
import Provider from "react-redux/es/components/Provider";
import store from "./store";
import { AuthProvider } from "./contexts/JWTContext";
import Router from "./routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
