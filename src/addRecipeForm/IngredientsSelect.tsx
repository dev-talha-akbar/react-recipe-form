import { useState } from "react";

import { useTranslation } from "react-i18next";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import IngredientsSearchInput from "./IngredientsSearchInput";
import EditIngredientForm from "./EditIngredientForm";
import { RecipeIngredient } from "../types";
import { formatQuantity } from "./ingredientUtils";

interface IngredientsSelectProps {
  ingredients: RecipeIngredient[];
  onChange?: (ingredients: RecipeIngredient[]) => void;
  [x: string]: unknown;
}

export default function IngredientsSelect({
  ingredients: initialIngredients,
  onChange,
  ...rest
}: IngredientsSelectProps) {
  const { t } = useTranslation();

  const [ingredients, setIngredients] =
    useState<RecipeIngredient[]>(initialIngredients);

  return (
    <div {...rest}>
      <IngredientsSearchInput
        onIngredientSelect={(ingredient) => {
          const unit = ingredient.defaultUnit;
          const quantity = ingredient.defaultQuantity;

          const newIngredients = [
            ...ingredients,
            {
              ingredient,
              unit,
              quantity,
            },
          ];

          setIngredients(newIngredients);
          onChange?.(newIngredients);
        }}
      />
      {ingredients.length === 0 && (
        <Card className="text-center bg-body-secondary border-0">
          <Card.Body>
            <div className="p-4">
              <Card.Title>{t("No ingredients added")}</Card.Title>
              <Card.Text>
                {t(
                  "Specifying ingredients separately help users find relevant recipes"
                )}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      )}

      {ingredients.length > 0 && (
        <Card>
          <Card.Header>{t("Selected ingredients")}</Card.Header>
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
                    <EditIngredientForm
                      recipeIngredient={recipeIngredient}
                      onChange={(newRecipeIngredient) => {
                        const newIngredients = [
                          ...ingredients.slice(0, index),
                          newRecipeIngredient,
                          ...ingredients.slice(index + 1),
                        ];

                        setIngredients(newIngredients);
                        onChange?.(newIngredients);
                      }}
                    />
                    <Button
                      variant="light"
                      size="sm"
                      className="text-danger"
                      onClick={() => {
                        const newIngredients = ingredients.filter(
                          (_recipeIngredient, deletedIndex) =>
                            index !== deletedIndex
                        );

                        setIngredients(newIngredients);
                        onChange?.(newIngredients);
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
