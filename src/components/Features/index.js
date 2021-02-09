import React, { useContext, useMemo, useState } from "react";
import { Box, ButtonGroup, Button } from "@material-ui/core";
import AppContext from "../../store/context";

import { SET_FEATURES } from "../../constant";
import useStyles from "./style";

export default function Feature() {
  const { state, dispatch } = useContext(AppContext);
  const { selectedFeatures, id } = state.currentProduct;
  const { productByIds } = state.products;

  const [featureName, featureOptions] = useMemo(() => {
    return (
      Object.entries(productByIds[id]?.byColor[selectedFeatures.color]).find(
        (item) => item[0] !== "remaining"
      ) || []
    );
  }, [id, productByIds, selectedFeatures.color]);

  const handelClick = (item) => {
    console.log(item);
    dispatch({ type: SET_FEATURES, data: { value: item, name: featureName } });
  };

  const classes = useStyles();

  return (
    <>
      {featureName && (
        <div>
          <Box component="h3">{featureName}</Box>
          <ButtonGroup aria-label="outlined button group">
            {featureOptions.map((item) => (
              <Button
                key={item}
                onClick={() => handelClick(item)}
                className={
                  selectedFeatures[featureName] === item ? classes.selected : ""
                }
              >
                {item}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}
    </>
  );
}
