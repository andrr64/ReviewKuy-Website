import { FaSearch } from 'react-icons/fa';
import phone_illustration from '../assets/phone-illustration.png';

function Jumbotron() {
  const handleScrollToBrand = () => {
    const target = document.getElementById("brand");
    if (target) {
      target.scrollIntoView({ 
        block: 'start',
        behavior: "smooth" });
    }
  };

  return (
    <section id='jumbotron' className='flex flex-wrap p-12 rounded-2xl items-center bg-light-purple'>
      <div id='text-container' className='text-primary space-y-5 w-1/2 pr-4'>
        <h1 className='font-bold text-4xl'>Temukan Gadget Terbaikmu di ReviewKuy</h1>
        <p><b>ReviewKuy</b> memberikan ulasan jujur, tips teknis, dan katalog spesifikasi lengkap, membantu kamu memilih gadget terbaik. </p>
        <button onClick={() => handleScrollToBrand()} className='bg-button-purple mt-4 p-2 flex hv-center space-x-2 px-6 py-3 rounded-full text-white'>
          <FaSearch />
          <p>Temukan Gadgetmu</p>
        </button>
      </div>
      <div id="img-container" className="bg-gray-300 rounded-2xl w-1/2 p-4">
        <img src={phone_illustration} alt="Phone Illustration" className='w-full h-auto' />
      </div>
    </section>
  );
}

export default Jumbotron;
