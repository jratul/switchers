import { notFound } from "next/navigation";
import { getProductBySlug } from "@/services/productService";
import { serialize } from "@/util/serialize";
import ProductDetailClient from "@/components/ProductDetailClient";

export default async function AccDetail({
  params,
}: {
  params: { slug: string };
}) {
  const accInfo = await getProductBySlug("accs", params.slug);

  if (!accInfo) {
    notFound();
  }

  return <ProductDetailClient productInfo={serialize(accInfo)} dirName="accs" />;
}
