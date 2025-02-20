import { LucideProps } from "lucide-react";
import Icon from "../../atoms/Icon";

type Props = {
  title: string;
  name: string;
  value: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder: string;
  required: boolean;
  regex?: string;
};

export const Input = ({
  title,
  name,
  value,
  icon,
  handleInputChange,
  placeholder,
  required,
  regex,
}: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {title}
      </label>
      <div className="relative">
        {icon && (
          <Icon
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
            icon={icon}
          />
        )}
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={required}
          placeholder={placeholder}
          pattern={regex}
        />
      </div>
    </div>
  );
};
