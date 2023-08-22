import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { RecipeIngredient } from "../types";

export interface IEditIngredientFormProps {
  recipeIngredient: RecipeIngredient;
  onChange?: (newRecipeIngredient: RecipeIngredient) => void;
}

export default function IngredientEditForm({
  recipeIngredient: initialRecipeIngredient,
  onChange,
}: IEditIngredientFormProps) {
  const { t } = useTranslation();

  const [isFormShown, setIsFormShown] = useState(false);
  const [recipeIngredient, setRecipeIngredient] = useState<RecipeIngredient>(
    initialRecipeIngredient
  );

  function handleClose() {
    setIsFormShown(false);
  }

  return (
    <>
      <Button variant="light" size="sm" onClick={() => setIsFormShown(true)}>
        <i className="bi bi-pencil"></i>
      </Button>
      <Modal show={isFormShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Specify ingredient")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="quantity">
              <Form.Label>{t("Quantity")}</Form.Label>
              <Form.Control
                type="number"
                value={recipeIngredient.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);

                  if (Number.isNaN(newQuantity) || newQuantity < 1) {
                    return;
                  }

                  const newRecipeIngredient = {
                    ...recipeIngredient,
                    quantity: newQuantity,
                  };

                  setRecipeIngredient(newRecipeIngredient);
                  onChange?.(newRecipeIngredient);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="unit">
              <Form.Label>{t("Unit")}</Form.Label>
              <Form.Select
                value={recipeIngredient.unit.id}
                onChange={(e) => {
                  const selectedUnit =
                    recipeIngredient.ingredient.unitsOfMeasure.find(
                      (unit) => unit.id === e.target.value
                    );

                  if (!selectedUnit) {
                    throw new Error("Invalid unit selected");
                  }

                  const newRecipeIngredient = {
                    ...recipeIngredient,
                    unit: selectedUnit,
                  };

                  setRecipeIngredient(newRecipeIngredient);
                  onChange?.(newRecipeIngredient);
                }}
              >
                {recipeIngredient.ingredient.unitsOfMeasure.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
