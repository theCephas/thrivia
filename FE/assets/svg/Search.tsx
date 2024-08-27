import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Search = (props: SvgProps) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
    <Path
      d="M13.0418 13.0416L9.91683 9.91659M0.958496 6.16659C0.958496 3.2901 3.29035 0.958252 6.16683 0.958252C9.04331 0.958252 11.3752 3.2901 11.3752 6.16659C11.3752 9.04307 9.04331 11.3749 6.16683 11.3749C3.29035 11.3749 0.958496 9.04307 0.958496 6.16659Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Search;
