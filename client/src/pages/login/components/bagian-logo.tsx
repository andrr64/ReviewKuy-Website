import { RK_WhiteLogo } from "../../../assets/import";


export default function LogoSection() {
  return (
    <div className="text-center text-white mb-8">
        <img src={RK_WhiteLogo} alt="Review Kuy Logo" className="h-20 mx-auto mb-2" />
        <p className='font-medium text-xl'>Login</p>
        <p className="text-xs opacity-90">Silahkan masukan email dan password.</p>
    </div>
  )
}
