import { useState } from "react";
import { useTranslation } from "react-i18next";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import IngredientsSelect from "./IngredientsSelect";

import { RecipeIngredient } from "../types";

interface AddRecipeFormProps {
  [x: string]: unknown;
}

export default function AddRecipeForm({ ...rest }: AddRecipeFormProps) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([]);
  const [guideText, setGuideText] = useState("");

  return (
    <div {...rest}>
      <h1>{t("Add recipe")}</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          console.log(title, ingredients, guideText);
        }}
      >
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>{t("Title")}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t("Name your recipe")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Text className="text-muted">
            {t(
              "The recipe will be shown in the search results based on its title."
            )}
          </Form.Text>
        </Form.Group>
        <IngredientsSelect
          ingredients={ingredients}
          onChange={(ingredients) => setIngredients(ingredients)}
          className="mb-3"
        />
        <Form.Group className="mb-3" controlId="recipeGuideInput">
          <Form.Label>{t("Recipe Guide")}</Form.Label>
          <Form.Control
            as="textarea"
            value={guideText}
            onChange={(e) => setGuideText(e.target.value)}
            rows={10}
            placeholder={t(
              "Write your recipe here with step-by-step instructions."
            )}
          />
        </Form.Group>
        <div className="d-flex align-items-center gap-3">
          <Button type="submit">{t("Publish recipe")}</Button>
          <span className="text-muted">{t("Automatic draft saved")}</span>
        </div>
      </Form>
    </div>
  );
}
