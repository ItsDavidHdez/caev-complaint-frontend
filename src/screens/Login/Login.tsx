import { User } from "lucide-react";
import { Input } from "../../components";

export const Login = () => {
  const data = {
    user: "",
    password: "",
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <Input
        title="Usuario"
        icon={User}
        name="user"
        value={data.user}
        handleInputChange={() => console.log(data.user)}
        required
        placeholder="Usuario"
      />
      <Input
        title="Contraseña"
        icon={User}
        name="password"
        value={data.password}
        handleInputChange={() => console.log(data.password)}
        required
        placeholder="Contraseña"
      />
    </div>
  );
};
