import { routes } from "../../../route";

interface BrandCardData {
    imgUrl: string;
    brandName: string;
    id: any;
}

function BrandCard(brandCardData: BrandCardData) {
  return (
    <a href={routes.get.productBy.brand(brandCardData.id)} className="transition-300 hover:-translate-y-2">
        <img className="h-32 w-auto" src={brandCardData.imgUrl} alt="" />
    </a>
  )
}

export default BrandCard