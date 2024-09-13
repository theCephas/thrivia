import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const HomeTwo = (props: SvgProps) => (
  <Svg
    fill="#fff"
    height="25px"
    width="25px"
    id="Layer_1"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path d="M256,0L0,256l42.7,42.7l64-64V512h298.7V234.7l64,64L512,256L256,0z M234.7,448h-64v-64h64V448z M234.7,341.3h-64v-64h64 V341.3z M341.3,448h-64v-64h64V448z M341.3,341.3h-64v-64h64V341.3z M426.7,0h-64v42.7l64,64V0z" />
  </Svg>
);
export default HomeTwo;
