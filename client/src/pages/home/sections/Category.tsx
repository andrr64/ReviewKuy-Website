import { useEffect, useState } from "react";
import { CategoryModel } from "../../../model/category.model";
import { CategoryAPI } from "../../../api/category.api";
import CategoryCard from "../components/CategoryCard";
import LoadingSpinner from "../../../components/spinner/LoadingSpinner";
import Container from "../../../components/Container";


///TODO: implementasi getData 

function Category() {
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    setLoading(true);
    const response = (await CategoryAPI.getCategories());
    if (response.status === 200) {
      setCategories(response.data.map((val: any) => new CategoryModel(val)));
    } else {
      setCategories(null);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <section id="category">
      <Container>
        <div className="flex flex-col items-center">
          <h1 className="title text-primary mb-10">Kategori</h1>
          <div className="flex gap-5">
            {loading && (<LoadingSpinner size="20" />)}
            {categories !== null && categories.length !== 0 && (
              <>
                {categories.map((data, i) => {
                  return <CategoryCard key={i} data={data} />
                })}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Category
