"use client";
import React, { FC, use, useEffect, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "@/redux/store";
import { setUser } from "@/redux/features/usersSlice";
import { useRouter } from "next/navigation";
import { fetchAffiliateUser } from "@/redux/features/affiliatesSlice";
import { useSession, signIn, signOut } from "next-auth/react"
import Modal from "@/components/Modal";
import WhatsAppLognContent from "./WhatsAppLognContent";
import { Route } from "next";
export interface PageLoginProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession()
  const { config } = useAppSelector((state) => state.initials)
  const { jwtToken } = useSelector(
    (state: RootState) => state.users
  );
  
  
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [whatsappOpen, setwhatsappOpen] = useState(false);


  const logIn = async () => {
    const payload = {
      email: userName,
      password: password,
    };

    try {
      const response = await fetch(
        `${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/users/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function loginProcess() {
    try {
      const response = await logIn();
      dispatch(setUser(response));
      dispatch(fetchAffiliateUser() as any);
      {response?.jwtToken && (
      router.push("/")
      )}
      setError(response?.error)
    } catch (error) {
      console.error(error);
    }
  }


  const googleSignIn = async () => {
    const payload = {
      email: session?.user?.email,
      name: session?.user?.name,
    };

    try {
      const response = await fetch(
        `${config?.NEXT_PUBLIC_SERVER_URL}/api/v1/users/emailLogin`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function googleProcess() {
    try {
      const response = await googleSignIn();
      dispatch(setUser(response));
      dispatch(fetchAffiliateUser() as any);
      {response?.jwtToken && (
        router.push("/")
      )}
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    {session && !jwtToken && (
    googleProcess()
    )}
  },[session])

  function whatsappLoginContent(){
    return(
      
        <WhatsAppLognContent/>
     
    )
  }

  
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
              <a
                onClick={() => signIn("google", { callbackUrl: "https://mytravellerschoice.com/api/auth/callback/google" })}
                className="flex cursor-pointer w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={loginSocials[2].icon}
                  alt={loginSocials[2].name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {loginSocials[2].name}
                </h3>
              </a>
          </div>
          {/* login with whatsapp */}

          <div className="grid gap-3">
              <a
               onClick={()=>setwhatsappOpen(true)}
                className="flex justify-center items-center cursor-pointer w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <div className="lab la-whatsapp h-fit w-fit text-2xl text-green-600  flex justify-center items-center" ></div>
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  Login with whatsapp 
                </h3>
              </a>
          </div>
          <Modal
          modalOpen={whatsappOpen}
          setModalOpen={setwhatsappOpen}
          children={whatsappLoginContent()}
        />

        {/* login with whatsapp */}
          
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href={"/login" as Route} className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" 
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1" />
            </label>
          </form>

          <ButtonPrimary 
          className="md:w-fit w-full"
          disabled={userName === "" && password.trim() === ""}
          onClick={loginProcess}>Continue</ButtonPrimary>

          {error !== "" && (
            <p className="text-[13px] mt-3 text-red-600">Error: {error}</p>
          )}


          {/* ==== */}
          <span className="md:block hidden text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href={"/signup" as Route} className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
