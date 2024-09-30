import React from "react";
import InputField from "../InputField";
import Money from "../../assets/svg/Money";
import LoanIcon from "../../assets/svg/LoanIcon";

interface Props {
  form: any;
  setForm: (value: any) => void;
}

const ApplyStageOne: React.FC<Props> = ({ form, setForm }) => {
  return (
    <>
      <InputField
        placeholder="Amount"
        icon={Money}
        value={form.amount}
        keyboardType="number-pad"
        onChangeText={(value: any) => setForm({ ...form, amount: value })}
      />
      <InputField
        placeholder="Loan purpose"
        icon={LoanIcon}
        value={form.purpose}
        keyboardType="default"
        onChangeText={(value: any) => setForm({ ...form, purpose: value })}
      />
    </>
  );
};

export default ApplyStageOne;
