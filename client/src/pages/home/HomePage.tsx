import { setTitle } from "../utility";
import About from "./sections/About";
import Brand from "./sections/Brand";
import Category from "./sections/Category";
import Jumbotron from "./sections/Jumbotron";

export default function Home() {
  setTitle('Beranda');
  return (
    <div className="min-h-screen space-y-8 ">
        <Jumbotron />
        <Category />
        <Brand/>
        <About/>
    </div>
  )
}
