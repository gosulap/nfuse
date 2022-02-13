import { useEffect, useState } from "react";
import { checkLoggedInStatus } from "../providers/Web3Provider";

import Login from "./Login";
import Home from "./Home";

function App() {
  const [address, setAddress] = useState(null);
  useEffect(async () => {
    console.log("address" + address);
    setAddress(await checkLoggedInStatus());
  });
  return (
    <div className="App">
      {address}
      {!address && <Login />}
      {address && <Home />}
    </div>
  );
}

export default App;
