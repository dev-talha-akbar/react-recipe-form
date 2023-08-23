import { QueryClientProvider, QueryClient } from "react-query";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import AddRecipeForm from "./addRecipeForm/AddRecipeForm";
import LanguageSelect from "./languageSelect/LanguageSelect";

import "./i18n";

import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar expand="lg" className="bg-body-light">
        <Container>
          <Navbar.Brand href="#">react-recipe-form</Navbar.Brand>
          <LanguageSelect />
        </Container>
      </Navbar>
      <Container>
        <AddRecipeForm className="my-4 col-6" />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
