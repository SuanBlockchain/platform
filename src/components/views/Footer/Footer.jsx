import TerrasachaLogo from "components/common/TerrasachaLogo";
/* import LOGO from "../../common/_images/suan_logo.png"; */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-3 flex flex-col items-center text-center bg-[#ecd798] text-[#6e6c35] font-bold space-y-2">
      <TerrasachaLogo className={"w-64 h-auto"} />
      <p className="mb-0">Copyright © Terrasacha {year}</p>
    </footer>
  );
};

export default Footer;
