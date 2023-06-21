import "./header.css";
import HeaderImg from "../../asset/header.png";

const Header = () => {
  const scrollDown = () => {
    window.scrollTo({ top: 410, behavior: "smooth" });
  };
  return (
    <div className='header'>
      <div className='header-container'>
        <div class='header-content'>
          <h1>E-Corp Blog</h1>
          <p>
            Welcome to our blog website, your go-to destination for a wide range
            of engaging and informative articles covering various categories.
            Our platform offers an extensive collection of articles on topics
            ranging from business and economics to technology, sports, culinary
            delights, international news, and even captivating science fiction.
          </p>
          <span onClick={scrollDown}>Let's explore!</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
