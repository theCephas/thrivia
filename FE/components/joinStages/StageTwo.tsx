import SelectBank from "@/assets/svg/SelectBank";
import OneTwoThree from "@/assets/svg/OneTwoThree";
import AccountName from "@/assets/svg/AccountName";
import Dropdown from "../Dropdown";
import InputField from "../InputField";

interface StageTwoProps {
  form: any;
  setForm: (value: any) => void;
}

const StageTwo: React.FC<StageTwoProps> = ({ form, setForm }) => {
  const setSelectedBank = (value: string) => {
    setForm({ ...form, selectBank: value });
  };

  return (
    <>
      <Dropdown
        placeholder="Select Bank"
        value={form.selectBank}
        options={["Bank A", "Bank B", "Bank C"]}
        onSelect={setSelectedBank}
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

export default StageTwo;
