"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  //   console.log(user);
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">SNS Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <button
                  onClick={logout}
                  className="bg-white text-black py-2 px-3 rounded-lg font-medium"
                >
                  ログアウト
                </button>
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white text-black py-2 px-3 rounded-lg font-medium"
                >
                  プロフィール
                </Link>
                <Link href={`/setting/${user.id}`}>
                  <img
                    className="w-10 h-10 rounded-full mr-2 absolute top-4 right-10"
                    src={user?.profile.profileImageUrl}
                    alt="User Avatar"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-black py-2 px-3 rounded-lg font-medium"
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-black py-2 px-3 rounded-lg font-medium"
                >
                  サインアップ
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
