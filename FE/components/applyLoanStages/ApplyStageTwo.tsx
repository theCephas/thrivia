import SelectBank from "@/assets/svg/SelectBank";
import Dropdown from "../Dropdown";
import InputField from "../InputField";
import Money from "@/assets/svg/Money";

interface Props {
  form: any;
  setForm: (value: any) => void;
}

const ApplyStageTwo: React.FC<Props> = ({ form, setForm }) => {
  return (
    <>
      <InputField
        placeholder="Amount"
        icon={Money}
        value={form.amount}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, accountNumber: value })}
      />
      <Dropdown
        placeholder="Loan purpose"
        value={form.purpose}
        options={["Bank A", "Bank B", "Bank C"]}
        onSelect={(value) => setForm({ ...form, purpose: value })}
        icon={SelectBank}
      />
      <Dropdown
        placeholder="Loan term"
        value={form.term}
        options={["3 months", "6 months", "1 year"]}
        onSelect={(value) => setForm({ ...form, term: value })}
        icon={SelectBank}
      />
    </>
  );
};

export default ApplyStageTwo;
