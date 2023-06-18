import "./footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-title'>
        <h2 className='footer-title-large'>E-Corp Blog</h2>
      </div>
      <div className='footer-social'>
        <i className='bx bxl-facebook-circle footer-icon'></i>
        <i className='bx bxl-instagram-alt footer-icon'></i>
        <i className='bx bxl-pinterest footer-icon'></i>
        <i className='bx bxl-twitter footer-icon'></i>
      </div>
      <div className='footer-description'>
        <span>E-Corp &copy; Copyright 2023. All rights reserved </span>
        <span>With a commitment to quality content for our community.</span>
      </div>
    </div>
  );
};

export default Footer;
