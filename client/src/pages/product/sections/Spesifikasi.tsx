import { ProductSpecificationModel } from '../../../model/product.specification.model'

interface SpesifikasiProdukProps {
    list_spek: ProductSpecificationModel[]
}

function SpesifikasiProduk({ list_spek }: SpesifikasiProdukProps) {
    return (
        <section id='spesifikasi-produk'>
            <h4 className="text-2xl font-bold mb-4">Spesifikasi</h4>
            <div className='space-y-4'>
                {list_spek.map((val, index) => {
                    return (
                        <div className='flex' key={index}>
                            {/* Menentukan lebar kolom name */}
                            <p className='font-bold w-40 text-[#941919] truncate'>{val.name}</p>
                            {/* Menentukan lebar kolom value */}
                            <p className='w-full text-gray-600'>{val.value}</p>
                        </div>
                    )
                })}
            </div>
        </section>

    )
}

export default SpesifikasiProduk