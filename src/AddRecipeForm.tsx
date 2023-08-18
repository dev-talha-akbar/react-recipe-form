import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import IngredientsSelect from "./IngredientsSelect";
import RecipeGuideInput from "./RecipeGuideInput";

interface AddRecipeFormProps {
  [x: string]: string;
}

export default function AddRecipeForm({ ...rest }: AddRecipeFormProps) {
  return (
    <div {...rest}>
      <h1>Add recipe</h1>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Name your recipe" />
          <Form.Text className="text-muted">
            The recipe will be shown in the search results based on its title.
          </Form.Text>
        </Form.Group>
        <IngredientsSelect className="mb-3" />
        <RecipeGuideInput />
        <div className="d-flex align-items-center gap-3">
          <Button>Publish recipe</Button>
          <span className="text-muted">Automatic draft saved</span>
        </div>
      </Form>
    </div>
  );
}
