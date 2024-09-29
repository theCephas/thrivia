import ArrowLeftBottom from "../assets/svg/ArrowLeftBottom";
import Arrowright from "../assets/svg/Arrowright";
import ArrowRightTop from "../assets/svg/ArrowRightTop";
import Call from "../assets/svg/Call";
import Dot from "../assets/svg/Dot";
import Email from "../assets/svg/Email";
import Finance from "../assets/svg/Finance";
import Home from "../assets/svg/Home";
import Lock from "../assets/svg/Lock";
import Notification from "../assets/svg/Notification";
import People from "../assets/svg/People";
import Profile from "../assets/svg/Profile";
import user from "../assets/svg/User";
import { SvgProps } from "react-native-svg";

export const ACCESS_TOKEN = "access";
export const REFRESH_TOKEN = "refresh";

export const Icons = {
  Arrowright,
  Call,
  Email,
  Lock,
  user,
  Finance,
  Home,
  People,
  Profile,
  Notification,
};

export const publicBalance = [
  {
    id: 1,
    title: "Your contributions balance",
    balance: "₦0.00",
    action: "+ Add money",
  },
  {
    id: 2,
    title: "Your Loan balance",
    balance: "₦0.00",
    action: "+ Apply for loan",
  },
];

type basic = { id: number; title: string };
type publicBlData = basic & {
  type: string;
  time: string;
  amount: string;
  icon: React.FC<SvgProps>;
};
type publicBlDeet = basic & {
  data: publicBlData[];
};

export const publicBlDeets: publicBlDeet[] = [
  // {
  //   id: 1,
  //   title: "Recent transactions",
  //   data: [
  //     {
  //       id: 1,
  //       type: "Sent to Freedom Cooper..",
  //       time: "14:40 PM",
  //       amount: "3, 000",
  //       icon: ArrowRightTop,
  //     },
  //     {
  //       id: 2,
  //       type: "Received from Freedom Co..",
  //       time: "12 - 05 - 2024",
  //       amount: "3, 000",
  //       icon: ArrowLeftBottom,
  //     },
  //     {
  //       id: 3,
  //       type: "Sent to Freedom Cooper...",
  //       time: "14:40 PM",
  //       amount: "3, 000",
  //       icon: ArrowRightTop,
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Loan history",
  //   data: [
  //     {
  //       type: "Sent to Freedom Cooper..",
  //       time: "14:40 PM",
  //       amount: "3, 000",
  //       icon: ArrowRightTop,
  //     },
  //     {
  //       type: "Received from Freedom Co..",
  //       time: "12 - 05 - 2024",
  //       amount: "3, 000",
  //       icon: ArrowLeftBottom,
  //     },
  //     {
  //       type: "Sent to Freedom Cooper...",
  //       time: "14:40 PM",
  //       amount: "3, 000",
  //       icon: ArrowRightTop,
  //     },
  //   ],
  // },
];

export const financeLoanHistory = [
  {
    type: "Cephas applied for loan",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: Arrowright,
  },
  {
    type: "Israel repaid loan",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: Arrowright,
  },
  {
    type: "Cephas applied for loan",
    time: "12 - 05 - 2024",

    action: "View details",
    icon: Arrowright,
  },
  {
    type: "Cephas applied for loan",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: Arrowright,
  },
  {
    type: "Israel repaid loan",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: Arrowright,
  },
];

export const memberLoanHistory = [
  {
    type: "Loan repaid",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: ArrowRightTop,
    amount: "₦3,000",
  },
  {
    type: "Loan recieved",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: ArrowLeftBottom,
    amount: "₦3,000",
  },
  {
    type: "Loan repaid",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: ArrowRightTop,
    amount: "₦3,000",
  },
  {
    type: "Loan recieved",
    time: "12 - 05 - 2024",
    action: "View details",
    icon: ArrowLeftBottom,
    amount: "₦3,000",
  },
];

export const loanHistory = [
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa loan request",
    time: "14:30PM",
    icon: Dot,
  },
];

export const members = [
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
  {
    type: "Cephas Iseoluwa",
    userId: "FC203-52",
    icon: Dot,
  },
];

export const managerBlDeets = [
  {
    id: 1,
    title: "Recent transactions",
    data: [],
  },
  {
    id: 2,
    title: "Loan history",
    data: [
      {
        type: "Sent to Freedom Cooper..",
        time: "14:40 PM",
        amount: "3, 000",
        icon: ArrowRightTop,
      },
      {
        type: "Received from Freedom Co..",
        time: "12 - 05 - 2024",
        amount: "3, 000",
        icon: ArrowLeftBottom,
      },
      {
        type: "Sent to Freedom Cooper...",
        time: "14:40 PM",
        amount: "3, 000",
        icon: ArrowRightTop,
      },
    ],
  },
];

export const onboarding = [
  {
    id: 1,
    title: "Welcome to Thrivia!",
    description:
      "Empowering your financial journey through community support and shared growth. Join us and unlock exclusive benefits tailored just for you",
  },
  {
    id: 2,
    title: "Empower your future",
    description:
      "Easily manage your cooperative contributions, apply for loans, and participate in cooperative activities that drive growth for everyone. ",
  },
  {
    id: 3,
    title: "Grow your cooperative",
    description:
      "Oversee member contributions, manage loans, and keep everyone informed with transparent communication. Thrivia makes it easy to build a stronger cooperative",
  },
];
