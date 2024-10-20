import CategoryCard from "./components/CategoryCard"
import LaptopPng from './components/laptop.png';
import SpPng from './components/smarpthone.png';


///TODO: implementasi getData 
const GET_categoryData = () => {
  return [
    [LaptopPng, 'Laptop'],
    [SpPng, 'Smartphone'],
  ]
}

function Category() {
  const categories = GET_categoryData();

  return (
    <section id="category" className="bg-white flex flex-col hv-center border-2 w-full p-10">
      <h1 className="title text-primary mb-10">Kategori</h1>
      <div className="flex gap-5">
        {categories.map(([imgUrl, title], index) => (
          <CategoryCard key={index} imgUrl={imgUrl} title={title} />
        ))}
      </div>
    </section>
  )
}

export default Category
