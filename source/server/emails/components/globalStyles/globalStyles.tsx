import { css, Global } from "@emotion/react";
import type { FunctionComponent } from "react";
import { memo } from "react";

const GlobalStyles: FunctionComponent = (): JSX.Element => {
  return (
    <Global
      styles={css`
        *,
        *::after,
        *::before {
          box-sizing: border-box;
          margin: 0;
        }
        body {
          font-family: "Roboto", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
  );
};

export default memo(GlobalStyles);
