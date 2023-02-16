import { useState } from "react";
import "./App.css";
import { pb, client } from "./api";
import { Login } from "./Login";
import { QueryClientProvider } from "@tanstack/react-query";
import { Achievements } from "./Achievements";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(pb.authStore.isValid)} />;
  }

  return (
    <QueryClientProvider client={client}>
      <Achievements />
    </QueryClientProvider>
  );
}

export default App;
