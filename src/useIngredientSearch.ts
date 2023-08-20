import { useQuery } from "react-query";
import { Ingredient } from "./types";

export default function useIngredientSearch(query: string) {
  const {
    data: matchingIngredients,
    isLoading,
    isError,
  } = useQuery(["ingredientSearch", query], async function () {
    if (query.length < 2) {
      return null;
    }

    const allUnitsOfMeasure = {
      piece: {
        id: "piece",
        fullPattern: "{quantity} pieces",
        shortPattern: "{quantity} pc(s)",
      },
      tablespoon: {
        id: "tablespoon",
        fullPattern: "{quantity} tablespoons",
        shortPattern: "{quantity} tbsp(s)",
      },
    };

    const ingredients: Ingredient[] = [
      {
        id: "1",
        title: "Tomato",
        unitsOfMeasure: [allUnitsOfMeasure["piece"]],
        defaultUnit: allUnitsOfMeasure["piece"],
        defaultQuantity: 1,
      },
      {
        id: "2",
        title: "Onion",
        unitsOfMeasure: [allUnitsOfMeasure["piece"]],
        defaultUnit: allUnitsOfMeasure["piece"],
        defaultQuantity: 1,
      },
      {
        id: "3",
        title: "Olive Oil",
        unitsOfMeasure: [allUnitsOfMeasure["tablespoon"]],
        defaultUnit: allUnitsOfMeasure["tablespoon"],
        defaultQuantity: 1,
      },
      {
        id: "4",
        title: "Jalapenos",
        unitsOfMeasure: [allUnitsOfMeasure["piece"]],
        defaultUnit: allUnitsOfMeasure["piece"],
        defaultQuantity: 1,
      },
    ];

    return ingredients.filter(
      (ingredient) =>
        ingredient.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  });

  return {
    matchingIngredients,
    isLoading,
    isError,
  };
}
