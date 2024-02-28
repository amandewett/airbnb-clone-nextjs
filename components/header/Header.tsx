import { HeaderProps } from "@/lib/appTypes";
import Navbar from "./Navbar";

const Header = ({ user }: HeaderProps) => {
  return (
    <header>
      <Navbar user={user} />
    </header>
  );
};

export default Header;
