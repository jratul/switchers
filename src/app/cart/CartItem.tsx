import Image from "next/image";
import Divider from "@/components/Divider";
import { CartInfo } from "@/constants/types";
import { TrashIcon } from "@heroicons/react/20/solid";

interface Props {
  cartInfo: CartInfo;
  refresh: () => void;
}

export default function CartItem({ cartInfo, refresh }: Props) {
  const handleDelete = () => {
    fetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ cartId: cartInfo._id.toString() }),
    }).then((res) => {
      if (!res.ok) {
        throw new Error();
      }

      refresh();
    });
  };

  return (
    <div>
      <Divider />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="col-span-1">
          <div className="overflow-hidden">
            <Image
              src={cartInfo.image}
              alt={cartInfo.name}
              width={500}
              height={500}
              className="w-32 h-32 object-center object-cover"
            />
          </div>
        </div>
        <div className="col-span-2 flex">
          <div className="my-auto">
            <div className="text-red-500 text-lg font-semibold">
              {cartInfo.name}
            </div>
            <div className="text-gray-500">
              &#65510; {cartInfo.price.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center">
          <button className="cursor-pointer" onClick={handleDelete}>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
