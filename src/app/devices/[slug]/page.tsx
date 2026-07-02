import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";
import { getProductBySlug, getRelatedProducts } from "@/services/productService";
import { getWishlistEntry } from "@/services/wishlistService";
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

  const session = await getServerSession(authOptions);

  const [relatedProducts, wishlistEntry] = await Promise.all([
    getRelatedProducts("devices", deviceInfo.type, params.slug),
    session?.user?.email
      ? getWishlistEntry(session.user.email, "devices", params.slug)
      : Promise.resolve(null),
  ]);

  return (
    <ProductDetailClient
      productInfo={serialize(deviceInfo)}
      dirName="devices"
      relatedProducts={serialize(relatedProducts)}
      initialWishlisted={!!wishlistEntry}
      initialWishlistId={wishlistEntry ? wishlistEntry._id.toString() : null}
    />
  );
}
