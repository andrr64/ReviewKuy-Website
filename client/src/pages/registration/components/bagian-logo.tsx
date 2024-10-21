import { RK_WhiteLogo } from "../../../assets/import"

export default function LogoSection() {
  return (
    <div className="text-center mb-8 flex flex-col items-center">
      <a href="/">
        <img src={RK_WhiteLogo} alt="Review Kuy Logo" className="h-20 mb-6 mx-auto mb-2" />
      </a>
      <div className="w-full text-white text-center">
        <h1 className="text-xl laptop:text-2xl mb-1 font-bold">Buat Akun</h1>
        <p className="opacity-90">Silahkan masukan data anda yang diperlukan.</p>
      </div>
    </div>
  )
}
