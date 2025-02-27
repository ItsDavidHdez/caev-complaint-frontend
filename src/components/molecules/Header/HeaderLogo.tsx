import caevImage from "../../../assets/caev-logo.jpg";
import veracruzImage from "../../../assets/veracruz-logo.jpeg";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center">
      <img className="mr-6" src={veracruzImage} style={{ width: 100 }} />
      <img className="mr-8" src={caevImage} style={{ width: 100 }} />
      <div>
        <h1 className="text-2xl font-bold">Sistema de Quejas y Sugerencias</h1>
        <p>CAEV Tuxpan, Veracruz</p>
      </div>
    </div>
  );
};
