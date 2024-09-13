import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Success = (props: SvgProps) => (
  <Svg
    fill="#16a34a"
    width="30px"
    height="800px"
    viewBox="-1.7 0 20.4 20.4"
    className="cf-icon-svg"
    {...props}
  >
    <Path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.105-4.498a.791.791 0 0 0-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 1 0-1.216 1.014l2.459 2.952a.792.792 0 0 0 .608.285.83.83 0 0 0 .068-.003.791.791 0 0 0 .618-.393L12.6 6.866a.791.791 0 0 0-.29-1.081z" />
  </Svg>
);
export default Success;
