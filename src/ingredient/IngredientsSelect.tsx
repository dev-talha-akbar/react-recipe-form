import { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import IngredientsSearchInput from "./IngredientsSearchInput";
import IngredientEditForm from "./IngredientEditForm";
import { RecipeIngredient } from "../types";
import { formatQuantity } from "./ingredientUtils";

interface IngredientsSelectProps {
  [x: string]: unknown;
}

export default function IngredientsSelect({ ...rest }: IngredientsSelectProps) {
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  return (
    <div {...rest}>
      <IngredientsSearchInput
        onIngredientSelect={(ingredient) => {
          const unit = ingredient.defaultUnit;
          const quantity = ingredient.defaultQuantity;

          setIngredients([
            ...ingredients,
            {
              ingredient,
              unit,
              quantity,
            },
          ]);
        }}
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
            {ingredients?.map((recipeIngredient, index) => (
              <ListGroup.Item key={recipeIngredient.ingredient.id}>
                <div className="d-flex align-items-center justify-content-between">
                  <span>
                    {recipeIngredient.ingredient.title},{" "}
                    {formatQuantity(
                      recipeIngredient.quantity,
                      recipeIngredient.unit.shortPattern
                    )}
                  </span>
                  <div className="d-flex gap-2">
                    <IngredientEditForm
                      recipeIngredient={recipeIngredient}
                      onChange={(newRecipeIngredient) => {
                        setIngredients([
                          ...ingredients.slice(0, index),
                          newRecipeIngredient,
                          ...ingredients.slice(index + 1),
                        ]);
                      }}
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="text-danger"
                      onClick={() => {
                        setIngredients(
                          ingredients.filter(
                            (_recipeIngredient, deletedIndex) =>
                              index !== deletedIndex
                          )
                        );
                      }}
                    >
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
