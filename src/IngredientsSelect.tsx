import { useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

interface IngredientsSelectProps {
  [x: string]: string;
}

export default function IngredientsSelect({ ...rest }: IngredientsSelectProps) {
  const [ingredients] = useState([]);
  return (
    <div {...rest}>
      <Form.Group className="mb-3" controlId="ingredientsSelect">
        <Form.Label>Choose ingredients</Form.Label>
        <Form.Control type="text" placeholder="Search for an ingredient" />
      </Form.Group>
      {ingredients.length === 0 && (
        <Card className="text-center">
          <Card.Body>
            <div className="p-4">
              <Card.Title>No ingredients added</Card.Title>
              <Card.Text>
                Specifying ingredients separately help users find relevant
                recipes
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
