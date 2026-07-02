import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/productService";
import { serialize } from "@/util/serialize";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function DeviceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const deviceInfo = await getProductBySlug("devices", params.slug);

  if (!deviceInfo) {
    notFound();
  }

  return (
    <ProductDetailClient productInfo={serialize(deviceInfo)} dirName="devices" />
  );
}
