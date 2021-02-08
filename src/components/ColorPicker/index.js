import React, { useState } from "react";
import { Box } from "@material-ui/core";

import { Pallet } from "./pallet";

export default function ColorPicker({ item }) {
  const [selectedColor, setSelectedColor] = useState(() => {
    if (item) {
      return Object.keys(item)[0];
    }
  });

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
          {Object.keys(item).map((key, value) => (
            <>
              <Box
                key={key}
                component="div"
                mx={0.5}
                onClick={() => setSelectedColor(key)}
              >
                <Pallet color={key} />
              </Box>
            </>
          ))}
        </Box>
      </div>
    </div>
  );
}
