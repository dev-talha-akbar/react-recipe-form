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

    const ingredients: Ingredient[] = [
      {
        id: "1",
        title: "Tomato",
      },
      {
        id: "2",
        title: "Onion",
      },
      {
        id: "3",
        title: "Olive Oil",
      },
      {
        id: "4",
        title: "Jalapenos",
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
