import { CategoryModel } from "../../../model/category.model";

interface CategoryCardProps {
  data: CategoryModel;
}

const CategoryCard: React.FC<CategoryCardProps> = ({data}) => {
  return (
    <a href={`/kategori/${data.id}`}>
      <div className="h-full bg-light-purple flex flex-col justify-between transition-300 hover:-translate-y-5">
        <img src={data.image_url} alt={data.name} className='w-80 p-5' />
        <div className='bg-dark-purple text-center p-2 text-white'>
          <p>{data.name}</p>
        </div>
      </div>
    </a>
  )
}

export default CategoryCard