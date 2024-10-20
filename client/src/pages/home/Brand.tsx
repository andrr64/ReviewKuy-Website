import BrandCard from "./components/BrandCard"
import SamsungLogo from "./components/samsung.png";
import InfinixLogo from "./components/infinix.png";
import PocoLogo from "./components/poco.png";

import LenovoLogo from "./components/lenovo.png";
import AsusLogo from "./components/asus.png";

import { SlScreenSmartphone } from "react-icons/sl";
import { CiLaptop } from "react-icons/ci";

function Brand() {
    return (
        <section id="brand" className="bg-white flex flex-col hv-center border-2 w-full p-10">
            <h1 className="title text-primary mb-10">Merek</h1>
            <div className="text-left w-full flex flex-col gap-10">
                <div>
                    <div className="flex gap-1 mb-4 items-center">
                        <SlScreenSmartphone />
                        <p>Smartphone</p>
                    </div>
                    <div className="flex gap-3">
                        <BrandCard brandName="Samsung" imgUrl={SamsungLogo} />
                        <BrandCard brandName="Infinix" imgUrl={InfinixLogo} />
                        <BrandCard brandName="Poco" imgUrl={PocoLogo} />
                    </div>
                </div>
                <div>
                    <div className="flex gap-1 mb-4 items-center">
                        <CiLaptop />
                        <p>Laptop</p>
                    </div>
                    <div className="flex gap-3">
                        <BrandCard brandName="Lenovo" imgUrl={LenovoLogo} />
                        <BrandCard brandName="Asus" imgUrl={AsusLogo} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Brand