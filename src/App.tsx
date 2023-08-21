import { QueryClientProvider, QueryClient } from "react-query";
import AddRecipeForm from "./recipe/AddRecipeForm";

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
