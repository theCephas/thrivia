import React from "react";
import InputField from "../InputField";
import Call from "../../assets/svg/Call";
import Email from "../../assets/svg/Email";
import Dropdown from "../Dropdown";
import RepayLoan from "../../assets/svg/RepayLoan";
import RepayStartDate from "../../assets/svg/RepayStartDate";

interface ApproveStageOneProps {
  form: any;
  setForm: (value: any) => void;
}

const ApproveStageOne: React.FC<ApproveStageOneProps> = ({ form, setForm }) => {
  const setSelectedStructure = (value: string) => {
    setForm({ ...form, selectedStructure: value });
  };
  const setSelectedDate = (value: string) => {
    setForm({ ...form, selectedStructure: value });
  };
  return (
    <>
      <Dropdown
        placeholder="Repayment structure"
        options={["One-off payment", "Installment payments"]}
        onSelect={setSelectedStructure}
        value={form.selectedStructure}
        icon={RepayLoan}
      />
      <Dropdown
        placeholder="Repayment start date"
        options={["date 1", "date 2"]}
        onSelect={setSelectedDate}
        value={form.selectedDate}
        icon={RepayStartDate}
      />
      <Dropdown
        placeholder="Funding Type"
        options={["Bank transfer"]}
        onSelect={setSelectedDate}
        value={form.selectedDate}
        icon={RepayStartDate}
      />
      <InputField
        placeholder={`Contact Email Address`}
        icon={Email}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value: any) => setForm({ ...form, email: value })}
      />
      <InputField
        placeholder={`Contact Phone Number`}
        icon={Call}
        value={form.phoneNumber}
        keyboardType="number-pad"
        onChangeText={(value: any) => setForm({ ...form, phoneNumber: value })}
      />
    </>
  );
};

export default ApproveStageOne;
