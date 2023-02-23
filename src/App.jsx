import { createRoot } from "react-dom/client";
import CategoriesCRUD from "./CategoriesCRUD";
import CategoryDetails from "./CategoryDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProductForm from "./AddProductForm";
import NotFound from "./components/NotFound/NotFound.jsx";
import ProductDetails from "./ProductDetails.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import ProductsMenu from "./ProductsMenu";
import PosPage from "./PosPage";

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
            <NavBar />
          </header>
          <Routes>
            <Route path="/CategoryDetails/:id" element={<CategoryDetails />} />
            <Route path="/AddProductForm/:id" element={<AddProductForm />} />
            <Route path="/AddProductForm/" element={<AddProductForm />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="/ProductsMenu" element={<ProductsMenu />} />
            <Route path="/CategoriesCRUD" element={<CategoriesCRUD />} />
            <Route path="/" element={<PosPage />} />
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
