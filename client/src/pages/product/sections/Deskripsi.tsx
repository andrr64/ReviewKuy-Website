interface DeskripsiProps {
    deskripsi: string;
}

function Deskripsi({deskripsi}: DeskripsiProps) {
  return (
    <section id="deskripsi">
        <h4 className="text-2xl font-bold">Deskripsi</h4>
        <p className="mt-2 text-gray-600">{deskripsi}</p>
    </section>
  )
}

export default Deskripsi