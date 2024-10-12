import { RK_WhiteLogo } from "../../../assets/import"

export default function LogoSection() {
  return (
    <div className="text-center mb-8 flex flex-col laptop:flex-row items-center space-x-3">
      <a href="/">
        <img src={RK_WhiteLogo} alt="Review Kuy Logo" className="h-16 mx-auto mb-2" />
      </a>
      <div className="text-white text-center laptop:text-left">
        <h1 className="text-xl laptop:text-2xl mb-1 font-bold">Buat Akun</h1>
        <p className="text-xs opacity-90">Silahkan masukan data anda yang diperlukan.</p>
      </div>
    </div>
  )
}
