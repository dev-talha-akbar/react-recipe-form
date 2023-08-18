import Form from "react-bootstrap/Form";

export default function RecipeGuideInput() {
  return (
    <Form.Group className="mb-3" controlId="recipeGuideInput">
      <Form.Label>Recipe Guide</Form.Label>
      <Form.Control
        as="textarea"
        rows={10}
        placeholder="Write your recipe here. Use @ to mention an ingredient."
      />
    </Form.Group>
  );
}
