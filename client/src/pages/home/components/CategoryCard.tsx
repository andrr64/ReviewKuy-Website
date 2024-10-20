interface CategoryCardData {
  imgUrl: string;
  title: string;
}

function CategoryCard(categoryCardData: CategoryCardData) {
  return (
    <a href="">
      <div className="bg-light-purple transition-300 hover:-translate-y-5">
        <img src={categoryCardData.imgUrl} alt={categoryCardData.title} className='h-80 p-5' />
        <div className='bg-dark-purple text-center p-2 text-white'>
          <p>{categoryCardData.title}</p>
        </div>
      </div>
    </a>
  )
}

export default CategoryCard