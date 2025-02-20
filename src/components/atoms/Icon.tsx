import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
}

const Icon = ({
  icon: IconComponent,
  size = 24,
  color,
  className,
}: IconProps) => (
  <IconComponent className={className} size={size} color={color} />
);

export default Icon;
