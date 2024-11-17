import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <section className="dark:bg-gray-900">
      <div className="px-10 flex items-center h-screen ">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Halaman Tidak Ditemukan</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Maaf, kami tidak dapat menemukan halaman tersebut. Anda dapat menjelajahi banyak hal lainnya di halaman beranda.
          </p>
          <p
            onClick={() => {navigate(-1)}}
            className="inline-flex cursor-pointer text-white bg-dark-purple focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Kembali 
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
