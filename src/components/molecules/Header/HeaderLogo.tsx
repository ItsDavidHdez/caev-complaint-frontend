import { Building2 } from "lucide-react";
import Icon from "../../atoms/Icon";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center">
      <Icon className="h-8 w-8 mr-3" icon={Building2} />
      <div>
        <h1 className="text-2xl font-bold">Sistema de Quejas y Sugerencias</h1>
        <p className="text-blue-200">CAEV Tuxpan, Veracruz</p>
      </div>
    </div>
  );
};
