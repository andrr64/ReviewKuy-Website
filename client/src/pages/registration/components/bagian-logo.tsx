import logo from '../../../assets/logo.svg';  // Import logo dari folder assets

export default function LogoSection() {
  return (
    <div className="text-center mb-8">
        <img src={logo} alt="Review Kuy Logo" className="h-24 mx-auto mb-2" />
        <p className='text-2xl font-bold'>Daftar</p>
        <p className="text-sm text-gray-600">Silahkan masukan data yang diperlukan.</p>
    </div>
  )
}
