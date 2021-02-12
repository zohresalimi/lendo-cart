import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

import { Pallet } from "./pallet";
import AppContext from "../../store/context";
import { SET_FEATURES } from "../../constant";

import useStyles from "./style";
export default function ColorPicker({ items }) {
  const { state, dispatch } = useContext(AppContext);
  const selectedColor = state.currentProduct.selectedFeatures.color;
  const changeSelectedColor = (color) => {
    dispatch({ type: SET_FEATURES, data: { value: color, name: "color" } });
  };

  const classes = useStyles();
  return (
    <div>
      <div>
        <div>
          <Box component="p">
            Color:
            <Box component="span" mx={0.5}>
              {selectedColor}
            </Box>
          </Box>
        </div>
        <Box display="flex" component="div">
          {items.map((item) => (
            <Box
              key={item}
              component="div"
              mx={0.5}
              position="relative"
              data-testid="select-color"
              onClick={() => changeSelectedColor(item)}
            >
              <DoneIcon
                className={selectedColor === item ? classes.show : classes.hide}
              />
              <Pallet color={item} />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
}
