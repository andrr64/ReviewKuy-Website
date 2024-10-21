import { RK_WhiteLogo } from "../../../assets/import";


export default function LogoSection() {
  return (
    <div className="text-center text-white mb-8">
      <a href="/">
        <img src={RK_WhiteLogo} alt="Review Kuy Logo" className="h-20 mx-auto mb-2" />
      </a>
      <p className='font-bold text-xl'>Login</p>
      <p className="text-sm opacity-80">Silahkan masukan email dan password.</p>
    </div>
  )
}
