import { Server } from "miragejs";

import myData from "./mockProducts.json";
import useAxios from "./hooks/useAxios";

new Server({
  routes() {
    this.namespace = "api";
    this.get("/products", () => {
      return myData;
    });
  },
});

function App() {
  const [{ data, isLoading, isError }, doFetch] = useAxios();
  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("isError", isError);
  console.log("doFetch", doFetch);
  return <div className="App">App</div>;
}

export default App;
