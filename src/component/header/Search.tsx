import { Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const { Search: AntSearch } = Input;

const Search = () => {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState(searchParams.get("keyword")||"");
  useEffect(() =>{
    const keyword = searchParams.get("keyword") || "";
    setSearchProduct(keyword);
  },[searchParams])
  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`?keyword=${value.trim()}`);
    }
  };

  return (
    <AntSearch
      value={searchProduct}
      onChange={(e) => setSearchProduct(e.target.value)}
      onSearch={handleSearch}
      placeholder={t("header.search") + "..."}
      enterButton
      allowClear
      style={{ maxWidth: 400 }} // hoặc thêm class Tailwind nếu bạn dùng tailwind
    />
  );
};

export default Search;
