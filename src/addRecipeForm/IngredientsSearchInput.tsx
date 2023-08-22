import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Overlay from "react-bootstrap/Overlay";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

import useIngredientSearch from "./useIngredientSearch";

import { Ingredient } from "../types";

interface IngredientsSearchInputProps {
  onIngredientSelect?: (ingredient: Ingredient) => void;
  [x: string]: unknown;
}

export default function IngredientsSearchInput({
  onIngredientSelect,
  ...rest
}: IngredientsSearchInputProps) {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const cleanQuery = query.trim();

  const { matchingIngredients, isLoading } = useIngredientSearch(cleanQuery);

  const target = useRef<HTMLInputElement>(null);

  return (
    <div {...rest}>
      <Form.Group className="mb-3" controlId="ingredientsSelect">
        <Form.Label>{t("Choose ingredients")}</Form.Label>
        <Form.Control
          ref={target}
          type="text"
          placeholder={t("Search for an ingredient")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>
      <Overlay
        container={target.current?.parentElement}
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
              zIndex: 1,
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
                    <span className="visually-hidden">{t("Loading...")}</span>
                  </Spinner>
                  <span>{t("Searching ingredients...")}</span>
                </div>
              </Card.Body>
            )}
            {matchingIngredients && matchingIngredients.length === 0 && (
              <Card.Body>
                <div className="text-center">
                  <Card.Text>
                    {t("No matching ingredients in the database")}
                  </Card.Text>
                </div>
              </Card.Body>
            )}
            {matchingIngredients && matchingIngredients.length > 0 && (
              <>
                <div className="px-3 py-1 fst-italic">
                  {t("{{count}} matches", {
                    count: matchingIngredients.length,
                  })}
                </div>
                <ListGroup variant="flush" role="menu">
                  {matchingIngredients?.map((ingredient) => (
                    <ListGroup.Item
                      role="menuitem"
                      key={ingredient.id}
                      action
                      onClick={() => {
                        setQuery("");
                        target.current?.focus();
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
