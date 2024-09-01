import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LoaderIcon = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFF"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-loader-circle"
    {...props}
  >
    <Path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);
export default LoaderIcon;
