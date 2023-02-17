import { createRoot } from "react-dom/client";
import CategoriesCRUD from "./CategoriesCRUD";
import CategoryDetails from "./CategoryDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProductForm from "./AddProductForm";
import NotFound from "./NotFound.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <Link to="/">Home</Link>
          </header>
          <Routes>
            <Route path="/CategoryDetails/:id" element={<CategoryDetails />} />
            <Route path="/AddProductForm/:id" element={<AddProductForm />} />
            <Route path="/" element={<CategoriesCRUD />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
