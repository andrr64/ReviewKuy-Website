import { RK_FullLogo } from "../../../assets/import";
import MemberCard from "../components/MemberCard";

function About() {
  return (
    <section id="about" className="bg-white flex flex-col hv-center border-2 w-full py-10 px-20">
      <h1 className="text-2xl font-bold text-primary mb-10">Tentang Kami</h1>
      <div className="flex">
        <img className="mr-20" src={RK_FullLogo} alt="" />
        <p>
          ReviewKuy adalah platform terpercaya untuk ulasan produk dan layanan. Kami berkomitmen untuk memberikan informasi yang objektif dan mendalam, sehingga memudahkan pengguna dalam mengambil keputusan yang tepat.
          <br /><br />
          Dengan beragam kategori yang kami tawarkan, mulai dari teknologi, gaya hidup, hingga hiburan, ReviewKuy menjadi panduan terbaik bagi mereka yang ingin mendapatkan insight sebelum melakukan pembelian.
          <br /><br />
          Misi kami adalah membantu pengguna menemukan yang terbaik di setiap produk atau layanan yang mereka butuhkan.
        </p>
      </div>

      {/* Custom Divider */}
      <div className="my-10 w-full h-[2px] bg-gray-100"></div>

      <h1 className="text-2xl font-bold text-primary mb-10">Anggota</h1>
      <div className="flex flex-wrap gap-6 justify-center text-primary">
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </section>
  );
}

export default About;
