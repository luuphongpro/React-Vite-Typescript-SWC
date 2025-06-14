import useProduceStore from '../src/store/useProductStore';
import {numberOfPerPage} from '../src/config/setting'

const usePagination = () => {
    const currentPage = useProduceStore((state) => state.currentPage);
    const data = useProduceStore((state) => state.data);

    const paginatedData = data.slice(
        (currentPage - 1) * numberOfPerPage,
        currentPage * numberOfPerPage
    );

    return paginatedData;
}
export default usePagination;