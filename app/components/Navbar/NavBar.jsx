"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setToken(true) : setToken(false);
  }, [token, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    router.push("/");
  };

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

        {token ? (
          <button
            onClick={() => {
              handleLogout();
              showNotification({
                id: "logout",
                autoClose: true,
                color: "indigo",
                icon: <BiLogOut />,
                title: "Logging out",
                message: "Logged out Successfully",
              });
            }}
            className="px-2 py-2 text-sm leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
          >
            Log out
          </button>
        ) : (
          <Link href="/login" className="flex justify-center items-center">
            <button className="px-2 py-2 text-sm leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none">
              Log in
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
