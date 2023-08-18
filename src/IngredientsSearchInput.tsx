import { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

import useIngredientSearch from "./useIngredientSearch";

import { Ingredient } from "./types";

interface IngredientsSearchInputProps {
  onIngredientSelect?: (ingredient: Ingredient) => void;
  [x: string]: unknown;
}

export default function IngredientsSearchInput({
  onIngredientSelect,
  ...rest
}: IngredientsSearchInputProps) {
  const [query, setQuery] = useState("");
  const cleanQuery = query.trim();

  const { matchingIngredients, isLoading } = useIngredientSearch(cleanQuery);

  const target = useRef(null);

  return (
    <div {...rest}>
      <Form.Group className="mb-3" controlId="ingredientsSelect">
        <Form.Label>Choose ingredients</Form.Label>
        <Form.Control
          ref={target}
          type="text"
          placeholder="Search for an ingredient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>
      <Overlay
        target={target.current}
        show={cleanQuery.length >= 2}
        placement="bottom-start"
      >
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <Card
            {...props}
            className="mt-2 shadow"
            style={{
              width: "420px",
              ...props.style,
            }}
          >
            {isLoading && (
              <Card.Body>
                <div className="d-flex align-items-center gap-2">
                  <Spinner
                    className="text-secondary"
                    animation="border"
                    size="sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <span>Searching ingredients matching '{cleanQuery}'...</span>
                </div>
              </Card.Body>
            )}
            {matchingIngredients && matchingIngredients.length === 0 && (
              <Card.Body>
                <div className="text-center">
                  <Card.Text>No matching ingredients in the database</Card.Text>
                </div>
              </Card.Body>
            )}
            {matchingIngredients && matchingIngredients.length > 0 && (
              <>
                <div className="px-3 py-1 fst-italic">
                  {matchingIngredients.length} matches
                </div>
                <ListGroup variant="flush">
                  {matchingIngredients?.map((ingredient) => (
                    <ListGroup.Item
                      key={ingredient.id}
                      action
                      onClick={() => {
                        setQuery("");
                        onIngredientSelect?.(ingredient);
                      }}
                    >
                      {ingredient.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            )}
          </Card>
        )}
      </Overlay>
    </div>
  );
}
