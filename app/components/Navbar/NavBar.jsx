"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, Menu, rem } from "@mantine/core";
import getToken from "@/app/lib/getToken";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { BiLogOut, BiBookAdd } from "react-icons/bi";
import { BsFillCartFill } from "react-icons/bs";
import { BsEnvelopePaperFill } from "react-icons/bs";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setToken(token) : setToken(null);
  }, [searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(false);
    router.push("/");
  };

  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
        <Link href="/items" className="flex justify-center items-center">
          <Image
            src="/nav-icon.svg"
            alt="Logo"
            width={200}
            height={75}
            className="object-contain"
          />
        </Link>

        {token ? (
          <>
            <Menu shadow="md" width={200} position="bottom-end" withArrow arrowPosition="center">
              <Menu.Target>
                <Avatar
                className="hover:opacity-80"
                  radius="sm"
                  src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${getToken(token).email}`}
                  alt="avatar"
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item
                  className="hover:bg-slate-200"
                  onClick={() => {
                    router.push("/product/add");
                  }}
                  leftSection={
                    <BiBookAdd style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Add Item
                </Menu.Item>
                <Menu.Item
                  className="hover:bg-slate-200"
                  onClick={() => {
                    router.push("/rents");
                  }}
                  leftSection={
                    <BiBookAdd style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  My Rents
                </Menu.Item>
                <Menu.Item
                  className="hover:bg-slate-200"
                  onClick={() => {
                    router.push("/userItems");
                  }}
                  leftSection={
                    <BsFillCartFill style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  My Items
                </Menu.Item>
                <Menu.Item
                  className="hover:bg-slate-200"
                  onClick={() => {
                    router.push("/requests");
                  }}
                  leftSection={
                    <BsEnvelopePaperFill style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Rent Requests
                </Menu.Item>
                <Menu.Item
                  className="hover:bg-red-100"
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
                  leftSection={
                    <BiLogOut style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Log out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
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
