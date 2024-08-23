"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import { ProductInfo } from "@/constants/types";
import { useSession } from "next-auth/react";
import { authenticated } from "@/constants/data";
import BaseDialog from "@/components/BaseDialog";
import useCartCountStore from "@/hooks/useCartCountStore";

export default function DeviceDetail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [deviceInfo, setDeviceInfo] = useState<ProductInfo>();
  const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
  const [doneDialogOpen, setDoneDialogOpen] = useState<boolean>(false);

  const cartCount = useCartCountStore((state) => state.cartCount);
  const updateCartCount = useCartCountStore((state) => state.updateCartCount);

  const handleAddCart = () => {
    if (!deviceInfo) {
      return;
    }

    fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        name: deviceInfo.name,
        price: deviceInfo.price,
        image: `${process.env.NEXT_PUBLIC_BUCKET_URL}/devices/${deviceInfo.image}`,
        userEmail: session?.user?.email as string,
      }),
    }).then((res) => {
      if (res.status === 400 || res.status === 401) {
        router.push("/login");
      } else if (res.status === 409) {
        setErrorDialogOpen(true);
      } else {
        setDoneDialogOpen(true);
        updateCartCount(cartCount + 1);
      }
    });
  };

  useEffect(() => {
    if (!params.slug) {
      notFound();
    }

    fetch(`/api/devices/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          notFound();
        }
        return res.json();
      })
      .then((deviceInfo) => {
        setDeviceInfo(deviceInfo);
      })
      .catch(() => {
        notFound();
      });
  }, [params.slug]);

  return (
    <div className="mx-auto max-w-6xl p-5">
      <BaseDialog
        open={errorDialogOpen}
        setOpen={setErrorDialogOpen}
        title="중복 상품"
        content={["장바구니에 이미 해당 상품이 존재합니다."]}
        buttonText="확인"
        handleYes={() => {}}
      />
      <BaseDialog
        open={doneDialogOpen}
        setOpen={setDoneDialogOpen}
        title="추가 완료"
        content={["장바구니에 상품을 추가했습니다."]}
        buttonText="확인"
        handleYes={() => {}}
      />
      <Link
        href="#"
        onClick={() => router.back()}
        className="inline-block m-3 rounded-md bg-red-500 px-5 py-1 text-base font-medium text-white hover:bg-red-400"
      >
        &larr;
      </Link>
      {!deviceInfo ? (
        <Loading />
      ) : (
        <>
          <span className="align-middle text-4xl text-red-500 font-bold">
            {deviceInfo?.name}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="col-span-1">
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BUCKET_URL}/devices/${deviceInfo?.image}`}
                />
              </div>
            </div>
            <div className="flex flex-col flex-initial col-span-1 gap-2">
              <span className="text-lg">
                &#65510; {deviceInfo?.price?.toLocaleString()}
              </span>
              <div>
                <div className="text-xl text-red-500 font-semibold">종류</div>
                <div>{deviceInfo?.type}</div>
              </div>
              <p className="text-gray-500">{deviceInfo?.desc}</p>
              <Link
                className="py-2 text-white text-center bg-red-500 hover:bg-red-400 rounded"
                href="#"
                onClick={handleAddCart}
                scroll={false}
              >
                장바구니에 넣기
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
