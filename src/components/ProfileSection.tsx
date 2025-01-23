"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

function ProfileSection() {
  const { data: session, status } = useSession();

  if (!(status === "authenticated")) {
    return <div>You need to be logged in to view this page.</div>;
  }

  const { user } = session ;

  return (
    <div className="flex flex-col sm:flex-row p-4 sm:p-10 gap-4 items-center justify-center">
      <div className="flex justify-center sm:justify-start">
        <Image
          src={"/images/avatar.jpg"}
          alt="Avatar"
          width={120}
          height={120}
          className="rounded-3xl"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 w-full">
        <div className="text-center sm:text-left">
          {user && (
            <>
              <h2 className="text-lg sm:text-xl font-semibold">{user.name}</h2>
              <p className="text-md sm:text-lg">{user.email}</p>
            </>
          )}
        </div>
        <div className="flex justify-center sm:justify-start w-full sm:w-auto">
          <Button
            variant={"destructive"}
            className="text-red-500 rounded-xl border border-gray-200 w-full sm:w-auto"
            onClick={() => signOut()}
          >
            Log Out <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
