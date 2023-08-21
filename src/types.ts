export interface IngredientUnit {
  id: string;
  title: string;
  fullPattern: string;
  shortPattern: string;
}

export interface Ingredient {
  id: string;
  title: string;
  unitsOfMeasure: IngredientUnit[];
  defaultUnit: IngredientUnit;
  defaultQuantity: number;
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  unit: IngredientUnit;
  quantity: number;
}
