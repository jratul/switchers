"use client";

import BaseDialog from "@/components/BaseDialog";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { KeyboardEvent, useRef, useState } from "react";

export default function Login() {
  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/");
  }

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleLogin = () => {
    if (!emailRef.current || !passwordRef.current) {
      setErrorMessage("에러가 발생했습니다.");
      return;
    }

    const email = emailRef.current.value.replace(/(\s*)/g, "");
    const password = passwordRef.current.value.replace(/(\s*)/g, "");

    if (!email || !password) {
      setErrorMessage("입력이 올바르지 않습니다.");
      return;
    }

    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
      .then((res) => {
        console.log("res:", res);
        if (!res?.ok) {
          setErrorMessage("로그인 정보가 올바르지 않습니다.");
          return;
        }

        redirect("/");
      })
      .catch(() => {
        setErrorMessage("에러가 발생했습니다.");
      });
  };

  const handleJoin = () => {
    if (!emailRef.current || !passwordRef.current) {
      setErrorMessage("에러가 발생했습니다.");
      return;
    }

    const email = emailRef.current.value.replace(/(\s*)/g, "");
    const password = passwordRef.current.value.replace(/(\s*)/g, "");

    if (!email || !password) {
      setErrorMessage("입력이 올바르지 않습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch(`/api/join`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log("res:", res);
        if (res.status === 201) {
          setErrorMessage("");
          setDialogOpen(true);
        } else if (res.status === 409) {
          setErrorMessage("이미 가입된 이메일입니다.");
        } else {
          setErrorMessage("에러가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-6xl mx-auto h-full flex justify-center items-center">
      <BaseDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        title="환영합니다!"
        content={["스케쳐스의 회원이 되신 것을 축하합니다.", "로그인해주세요"]}
        buttonText="로그인"
        handleYes={handleLogin}
      />
      <div className="w-3xl mx-auto flex items-center gap-2">
        <div className="w-80">
          <img
            src="/images/animal_crossing.webp"
            alt="animal crossing"
            className="h-full w-full object-cover object-center rounded"
          />
        </div>
        <div className="w-60 grid gap-2">
          <input
            type="text"
            placeholder="이메일"
            ref={emailRef}
            className="px-2 py-3 border-0 rounded shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500"
            onKeyDown={handleKeyDown}
          />
          <input
            type="password"
            placeholder="비밀번호"
            ref={passwordRef}
            className="px-2 py-3 border-0 rounded shadow-sm ring-1 ring-inset ring-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-500"
            onKeyDown={handleKeyDown}
          />
          <div className="text-red-500">{errorMessage ?? " "}</div>
          <Link
            className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
            onClick={handleLogin}
          >
            로그인
          </Link>
          <Link
            className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
            href="#"
            onClick={handleJoin}
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
