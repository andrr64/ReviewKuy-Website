import { useNavigate } from "react-router-dom"
import { ProductModel } from "../../../model/product.model"
import { routes } from "../../../route";

interface HeaderProps {
    product: ProductModel
}

function Header({ product }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="flex text-primary gap-4">
            <img width={256} src={product.pictures[0].imageUrl} alt="" />

            <div 
                onClick={() => navigate(routes.get.productBy.brand(product.brand.id)) } 
                className="flex flex-col justify-center gap-4 cursor-pointer"
            >
                <div className="flex gap-1 items-center">
                    <img className="h-5" src={product.brand.logo_url} alt="" />
                    <p>{product.brand.name}</p>
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p>{product.description}</p>
            </div>

            <div>
                asdads
            </div>
        </div>
    )
}

export default Header