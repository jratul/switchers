import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/util/authOptions";
import { getProductBySlug, getRelatedProducts } from "@/services/productService";
import { getWishlistEntry } from "@/services/wishlistService";
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

  const session = await getServerSession(authOptions);

  const [relatedProducts, wishlistEntry] = await Promise.all([
    getRelatedProducts("accs", accInfo.type, params.slug),
    session?.user?.email
      ? getWishlistEntry(session.user.email, "accs", params.slug)
      : Promise.resolve(null),
  ]);

  return (
    <ProductDetailClient
      productInfo={serialize(accInfo)}
      dirName="accs"
      relatedProducts={serialize(relatedProducts)}
      initialWishlisted={!!wishlistEntry}
      initialWishlistId={wishlistEntry ? wishlistEntry._id.toString() : null}
    />
  );
}
