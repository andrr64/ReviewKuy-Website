interface BrandCardData {
    imgUrl: string;
    brandName: string;
}

function BrandCard(brandCardData: BrandCardData) {
  return (
    <a href="" className="transition-300 hover:-translate-y-2">
        <img className="h-32 w-auto" src={brandCardData.imgUrl} alt="" />
    </a>
  )
}

export default BrandCard