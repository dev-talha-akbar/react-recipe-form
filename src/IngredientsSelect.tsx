import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import IngredientsSearchInput from "./IngredientsSearchInput";
import { Ingredient } from "./types";

interface IngredientsSelectProps {
  [x: string]: unknown;
}

export default function IngredientsSelect({ ...rest }: IngredientsSelectProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  return (
    <div {...rest}>
      <IngredientsSearchInput
        onIngredientSelect={(i) => setIngredients([...ingredients, i])}
      />
      {ingredients.length === 0 && (
        <Card className="text-center bg-body-secondary border-0">
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

      {ingredients.length > 0 && (
        <Card>
          <Card.Header>Selected ingredients</Card.Header>
          <ListGroup variant="flush">
            {ingredients?.map((ingredient) => (
              <ListGroup.Item key={ingredient.id}>
                <div className="d-flex align-items-center justify-content-between">
                  <span>{ingredient.title}</span>
                  <div className="d-flex gap-2">
                    <Button variant="light" size="sm">
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="light" size="sm" className="text-danger">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </div>
  );
}
