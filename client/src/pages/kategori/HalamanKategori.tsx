import { useParams } from "react-router-dom"

function HalamanKategori() {

    const {id} = useParams();
    
    return (
        <div className="min-h-screen">{id}</div>
    )
}

export default HalamanKategori