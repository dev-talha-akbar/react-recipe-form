import { useQuery } from "react-query";
import { Ingredient } from "../types";

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
        title: "Pieces",
        fullPattern: "{quantity} piece(s)",
        shortPattern: "{quantity} pcs",
      },
      kilogram: {
        id: "kilogram",
        title: "Kilograms",
        fullPattern: "{quantity} kilogram(s)",
        shortPattern: "{quantity} kg",
      },
      milliliter: {
        id: "millliter",
        title: "Milliliters",
        fullPattern: "{quantity} milliliter(s)",
        shortPattern: "{quantity} ml",
      },
      tablespoon: {
        id: "tablespoon",
        title: "Tablespoons",
        fullPattern: "{quantity} tablespoon(s)",
        shortPattern: "{quantity} tbsp",
      },
    };

    const ingredients: Ingredient[] = [
      {
        id: "1",
        title: "Tomato",
        unitsOfMeasure: [
          allUnitsOfMeasure["piece"],
          allUnitsOfMeasure["kilogram"],
        ],
        defaultUnit: allUnitsOfMeasure["piece"],
        defaultQuantity: 1,
      },
      {
        id: "2",
        title: "Onion",
        unitsOfMeasure: [
          allUnitsOfMeasure["piece"],
          allUnitsOfMeasure["kilogram"],
        ],
        defaultUnit: allUnitsOfMeasure["piece"],
        defaultQuantity: 1,
      },
      {
        id: "3",
        title: "Olive Oil",
        unitsOfMeasure: [
          allUnitsOfMeasure["tablespoon"],
          allUnitsOfMeasure["milliliter"],
        ],
        defaultUnit: allUnitsOfMeasure["tablespoon"],
        defaultQuantity: 1,
      },
      {
        id: "4",
        title: "Jalapenos",
        unitsOfMeasure: [
          allUnitsOfMeasure["piece"],
          allUnitsOfMeasure["kilogram"],
        ],
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
