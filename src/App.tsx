import { QueryClientProvider, QueryClient } from "react-query";
import AddRecipeForm from "./addRecipeForm/AddRecipeForm";

import "./i18n";

import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container py-4">
        <AddRecipeForm className="col-6" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
