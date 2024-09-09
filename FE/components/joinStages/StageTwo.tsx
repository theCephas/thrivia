import InputField from "../InputField";
import Email from "@/assets/svg/Email";
import Address from "@/assets/svg/Address";
import Call from "@/assets/svg/Call";

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
      <InputField
        placeholder={`Phone Number`}
        icon={Call}
        value={form.phoneNumber}
        keyboardType="number-pad"
        onChangeText={(value) => setForm({ ...form, phoneNumber: value })}
      />
      <InputField
        placeholder={`Email Address`}
        icon={Email}
        value={form.email}
        keyboardType="email-address"
        onChangeText={(value) => setForm({ ...form, email: value })}
      />
      <InputField
        placeholder={`Residential Address`}
        icon={Address}
        value={form.add}
        keyboardType="default"
        onChangeText={(value) => setForm({ ...form, address: value })}
      />
    </>
  );
};

export default StageTwo;
