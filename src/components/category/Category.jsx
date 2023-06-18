import { useNavigate } from "react-router-dom";

function Category({
  categoryId = "",
  categoryName = "",
  currentBlogPage = "",
}) {
  const navigate = useNavigate();
  const hanleCategoryClick = () => {
    currentBlogPage = 1;
    navigate(`/${categoryName}/${categoryId}/${currentBlogPage}`);
  };
  return (
    <li
      className="top-list-item side-bar-list-item"
      onClick={hanleCategoryClick}
    >
      {categoryName}
    </li>
  );
}

function RenderCategory({ allCategory = [], currentBlogPage }) {
  return allCategory.map((category, index) => {
    return (
      <Category
        key={category.id}
        categoryId={category.id}
        categoryName={category.name}
        currentBlogPage={currentBlogPage}
      />
    );
  });
}

export default RenderCategory;
