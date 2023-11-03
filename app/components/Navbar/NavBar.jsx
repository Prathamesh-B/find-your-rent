"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "@mantine/notifications";

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
          <Button
            onClick={() => {
              handleLogout();
              showNotification({
                id: "logout",
                autoClose: true,
                color: "indigo",
                // icon: <FaSignOutAlt />,
                title: "Logging out",
                message: "Logged out Successfully",
              });
            }}
            variant="filled"
            color="rgba(238, 147, 34, 1)"
            size="md"
            radius="md"
          >
            Log out
          </Button>
        ) : (
          <Link href="/login" className="flex justify-center items-center">
            <Button
              variant="filled"
              color="rgba(238, 147, 34, 1)"
              size="md"
              radius="md"
            >
              Log in
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
