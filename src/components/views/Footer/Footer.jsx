import TerrasachaLogo from "components/common/TerrasachaLogo";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#ecd798] text-[#6e6c35] font-medium py-6 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-6 text-sm">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <TerrasachaLogo className="h-6 w-auto" />
      </div>
      <p className="mb-0">Copyright © Terrasacha {year}</p>
      <div className="text-left">
  <p className="text-xs font-semibold uppercase tracking-wide text-[#6e6c35] mb-2">
    Información legal
  </p>
  <ul className="space-y-1 text-sm text-[#6a6833] list-none pl-0">
  <li className="relative pl-4">
    <span className="absolute left-0 top-1.5 h-2 w-2 bg-[#6a6833] rounded-full" />
    <Link to="/tradicion-libertad" className="text-[#6a6833] hover:underline transition">
      Tradición y Libertad
    </Link>
  </li>
  <li className="relative pl-4">
    <span className="absolute left-0 top-1.5 h-2 w-2 bg-[#6a6833] rounded-full" />
    <Link to="/escrituras" className="text-[#6a6833] hover:underline transition">
      Escrituras
    </Link>
  </li>
  <li className="relative pl-4">
    <span className="absolute left-0 top-1.5 h-2 w-2 bg-[#6a6833] rounded-full" />
    <Link to="/planos-catastrales" className="text-[#6a6833] hover:underline transition">
      Planos Catastrales
    </Link>
  </li>
</ul>

</div>

      </div>
    </footer>
  );
};

export default Footer;
