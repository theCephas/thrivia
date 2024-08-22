import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Profile = (props: SvgProps) => (
  <Svg width={21} height={21} viewBox="0 0 21 21" fill="none" {...props}>
    <Path
      d="M15.5 16.2167H14.8667C14.2 16.2167 13.5667 16.475 13.1 16.9417L11.675 18.35C11.025 18.9917 9.96668 18.9917 9.31668 18.35L7.89166 16.9417C7.425 16.475 6.78333 16.2167 6.125 16.2167H5.5C4.11667 16.2167 3 15.1084 3 13.7417V4.65002C3 3.28336 4.11667 2.17505 5.5 2.17505H15.5C16.8833 2.17505 18 3.28336 18 4.65002V13.7417C18 15.1001 16.8833 16.2167 15.5 16.2167Z"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 8.83326C11.5723 8.83326 12.4417 7.96393 12.4417 6.89158C12.4417 5.81923 11.5723 4.94995 10.5 4.94995C9.42764 4.94995 8.55832 5.81923 8.55832 6.89158C8.55832 7.96393 9.42764 8.83326 10.5 8.83326Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.8333 13.5499C13.8333 12.0499 12.3417 10.8333 10.5 10.8333C8.65833 10.8333 7.16666 12.0499 7.16666 13.5499"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Profile;
