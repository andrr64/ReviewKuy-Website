import logo from '../../../assets/logo.svg';  // Import logo dari folder assets

export default function LogoSection() {
  return (
    <div className="text-center mb-8">
        <img src={logo} alt="Review Kuy Logo" className="h-24 mx-auto mb-2" />
        <p className='laptop:text-2xl font-bold'>Login</p>
        <p className="text-gray-600">Silahkan masukan email dan password.</p>
    </div>
  )
}
