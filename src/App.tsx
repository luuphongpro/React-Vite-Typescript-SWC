import { useCallback } from 'react'
import Fashion from './component/Fashion'
import Pagination from './component/Pagination';
import useFashionStore from './store/useFashionStore';
import usePagination from '../hook/usePagination';
import useProduce from '../hook/useProduce';
import Loading from './component/Loading';
function App() {
  const currenPage = useFashionStore((state) => state.currentPage);
  const setCurrenPage = useFashionStore((state) => state.setCurrentPage);
  const data = usePagination();
  const {isLoading}=useProduce();
  const totalPages = useFashionStore((state) => state.totalPages);

  const handleClickPagination = useCallback((page: number) => {
    setCurrenPage(page);
  }, [currenPage]);

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <>
      <div className='flex flex-wrap justify-center mx-auto w-5/6' >
        {data.map((item) => (
          <Fashion
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            discount={item.discount}
            discountPercentage={item.discountPercentage}
            isNew={item.isNew}
            brand={item.brand}
          ></Fashion>
        ))}
      </div>
      <Pagination
        currentPage={currenPage}
        totalPages={totalPages}
        handleClickPagination={handleClickPagination}
      />
    </>
  )
}

export default App
