import React, { useState } from "react";
import InputField from "../InputField";
import SelectBank from "@/assets/svg/SelectBank";
import OneTwoThree from "@/assets/svg/OneTwoThree";
import AccountName from "@/assets/svg/AccountName";
import Dropdown from "../Dropdown";

interface FormStageTwoProps {
  form: any;
  setForm: (value: any) => void;
  onSubmit: () => void;
}

const FormStageTwo: React.FC<FormStageTwoProps> = ({ form, setForm }) => {
  const setSelectedBank = (value: string) => {
    setForm({ ...form, selectBank: value });
  };

  return (
    <>
      <Dropdown
        placeholder="Select Bank"
        value={form.selectBank}
        options={["Bank A", "Bank B", "Bank C"]}
        onSelect={(value) => setForm({ ...form, selectBank: value })}
        icon={SelectBank}
      />

      <InputField
        placeholder="Account number"
        icon={OneTwoThree}
        value={form.accountNumber}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, accountNumber: value })}
      />
      <InputField
        placeholder="Account name"
        icon={AccountName}
        value={form.accName}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, accName: value })}
      />
    </>
  );
};

export default FormStageTwo;
