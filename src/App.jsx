import { createRoot } from "react-dom/client";
import CategoriesCRUD from "./CategoriesCRUD";
const App = () => {
  return (
    <div>
      <h1>My Start</h1>
      <CategoriesCRUD />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
