import useFashionStore from '../src/store/useFashionStore';

const usePagination = () => {
    const numberOfPerPage = 8;
    const currentPage = useFashionStore((state) => state.currentPage);
    const data = useFashionStore((state) => state.data);

    const paginatedData = data.slice(
        (currentPage - 1) * numberOfPerPage,
        currentPage * numberOfPerPage
    );

    return paginatedData;
}
export default usePagination;