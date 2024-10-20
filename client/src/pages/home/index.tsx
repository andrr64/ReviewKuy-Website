import Brand from "./Brand";
import Category from "./Category";
import Jumbotron from "./Jumbotron";

export default function Home() {
  return (
    <main className="bg-main py-20 space-y-8 px-40">
        <Jumbotron />
        <Category />
        <Brand/>
    </main>
  )
}
