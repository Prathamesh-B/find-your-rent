import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/nav-icon.svg"
            alt="Logo"
            width={200}
            height={75}
            className="object-contain"
          />
        </Link>

        <Button
          variant="filled"
          color="rgba(238, 147, 34, 1)"
          size="md"
          radius="md"
        >
          Log in
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
