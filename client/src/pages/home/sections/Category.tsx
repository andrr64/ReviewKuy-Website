import { useEffect, useState } from "react";
import { CategoryModel } from "../../../model/category.model";
import { CategoryAPI } from "../../../api/category.api";
import CategoryCard from "../components/CategoryCard";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";


///TODO: implementasi getData 

function Category() {
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    const data = (await CategoryAPI.getCategories()).data;
    setTimeout(() => {
      setCategories(data.map((val: any) => new CategoryModel(val)));
      setLoading(false);
    }, 500);

  }
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <section id="category" className="bg-white flex flex-col hv-center border-2 w-full p-10">
      <h1 className="title text-primary mb-10">Kategori</h1>
      <div className="flex gap-5">
        {loading && (<LoadingSpinner size="20" />)}
        {categories !== null && categories.length !== 0 && (
          <>
            {categories.map((data) => {
              return <CategoryCard data={data} />
            })}
          </>
        )}
      </div>
    </section>
  )
}

export default Category
