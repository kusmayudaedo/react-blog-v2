import "./postCard.css";

function PostCard({
  title = "",
  totalFav = "",
  username = "",
  currentPage = "",
  categoryName = "",
}) {
  return (
    <div className="post-card">
      <h3 className="post-card-title">{title}</h3>
      <div className="post-card-info">
        <div className="post-card-info-name">
          <span className="post-card-info-username">{username}</span>
          <span className="post-card-info-cat">{categoryName}</span>
          <span className="post-card-info-date">
            <i class="bx bxs-like"></i>
            {totalFav}
          </span>
        </div>
      </div>
    </div>
  );
}

function RenderPostCard({ mostFavorite = [], currentPage }) {
  return mostFavorite.map((articles, index) => {
    return (
      <PostCard
        key={articles.id}
        title={articles.title}
        totalFav={articles.total_fav}
        categoryName={articles.Category.name}
        username={articles.Likes[0].User.username}
        currentPage={currentPage}
      />
    );
  });
}

export default RenderPostCard;
