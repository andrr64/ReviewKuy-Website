import About from "./sections/About";
import Brand from "./sections/Brand";
import Category from "./sections/Category";
import Jumbotron from "./sections/Jumbotron";

export default function Home() {
  return (
    <main className="bg-main py-10 space-y-8 px-40">
        <Jumbotron />
        <Category />
        <Brand/>
        <About/>
    </main>
  )
}
