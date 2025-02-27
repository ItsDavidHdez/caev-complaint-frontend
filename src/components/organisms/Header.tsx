import { HeaderLogo } from "../molecules/Header/HeaderLogo";
import { HeaderButton } from "../molecules";

export const Header = () => {
  return (
    <header className="bg-white py-6 px-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <HeaderLogo />
        <HeaderButton />
      </div>
    </header>
  );
};
