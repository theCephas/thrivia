import Dropdown from "../Dropdown";
import InputField from "../InputField";
import User from "../../assets/svg/User";
import SelectBank from "../../assets/svg/SelectBank";
import { Text } from "react-native";
import OneTwoThree from "../../assets/svg/OneTwoThree";
import { useState } from "react";
import FormLoader from "../FormLoader";

interface Props {
  form: any;
  setForm: (value: any) => void;
  banks: any[];
  isVerifying: boolean;
  isVerified: boolean;
}

const ApplyStageTwo: React.FC<Props> = ({
  form,
  setForm,
  banks,
  isVerified,
  isVerifying,
}) => {
  const [loading, setLoading] = useState(false);

  const setSelectedBank = (value: string) => {
    setLoading(true);
    try {
      const selectedBank = banks.find((bank) => bank.name === value);
      setForm({
        ...form,
        bankName: value,
        bankCode: selectedBank?.code || "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dropdown
        placeholder="Select Bank"
        value={form.bankName}
        options={banks.map((bank) => bank.name)}
        onSelect={setSelectedBank}
        icon={SelectBank}
      />

      <InputField
        placeholder={`Account Number`}
        icon={OneTwoThree}
        value={form.accNumber}
        keyboardType="number-pad"
        onChangeText={(value: any) => setForm({ ...form, accNumber: value })}
      />
      {isVerifying && <Text style={{ color: "gray" }}>Verifying...</Text>}
      {isVerified && <Text style={{ color: "green" }}>Account Verified</Text>}
      <InputField
        placeholder={`Account name`}
        icon={User}
        value={form.accName}
        keyboardType="default"
        onChangeText={(value: any) => setForm({ ...form, accName: value })}
      />
      {loading && <FormLoader />}
    </>
  );
};

export default ApplyStageTwo;
