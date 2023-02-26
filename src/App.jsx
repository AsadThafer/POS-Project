import { createRoot } from "react-dom/client";
import CategoriesCRUD from "./pages/Categories/CategoriesCRUD";
import CategoryDetails from "./pages/Details/Category/CategoryDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProductForm from "./pages/ProductForm/AddProductForm";
import NotFound from "./pages/NotFound/NotFound";
import ProductDetails from "./pages/Details/Product/ProductDetails";
import NavBar from "./components/NavBar/NavBar";
import ProductsMenu from "./pages/Products/ProductsMenu";
import PosPage from "./pages/POS/PosPage";
import LoginPage from "./pages/Login/LoginPage";
import authentication from "./pages/Login/authentication";
import Orders from "./pages/Orders/Orders";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  if (!authentication()) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    );
  }

  if (authentication()) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <header>
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<PosPage />} />
            <Route path="/CategoryDetails/:id" element={<CategoryDetails />} />
            <Route path="/AddProductForm/:id" element={<AddProductForm />} />
            <Route path="/AddProductForm/" element={<AddProductForm />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="/ProductsMenu" element={<ProductsMenu />} />
            <Route path="/CategoriesCRUD" element={<CategoriesCRUD />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    );
  }
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
