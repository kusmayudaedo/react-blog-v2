import "./write.css";
import Topbar from "../../components/topbar/Topbar";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import Toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../../store/slices/blogs/slices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Write() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("IDN");
  const [categoryId, setCategoryId] = useState("");
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    { name: "Brunei", initials: "BRU" },
    { name: "Cambodia", initials: "CAM" },
    { name: "Indonesia", initials: "IND" },
    { name: "Laos", initials: "LAO" },
    { name: "Malaysia", initials: "MAL" },
    { name: "Myanmar", initials: "MYA" },
    { name: "Philippines", initials: "PHI" },
    { name: "Singapore", initials: "SIN" },
    { name: "Thailand", initials: "THA" },
    { name: "Timor-Leste", initials: "TIM" },
    { name: "Vietnam", initials: "VIE" },
  ];

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Check if a file was selected
    if (selectedImage) {
      const { type, size } = selectedImage;
      const allowedExtensions = ["image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // Check if the file extension and size are valid
      if (allowedExtensions.includes(type) && size <= maxSize) {
        setImage(selectedImage);
      } else {
        // Invalid file, reset the input and display an error message
        setImage(null);
        e.target.value = null;
        Toast.error(
          "Please upload a valid image file (JPEG/PNG) within 5MB size limit."
        );
      }
    }
  };

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      Toast.error("Please enter a title");
      return;
    }
    if (!categoryId) {
      Toast.error("Please select a category");
      return;
    }
    if (!image) {
      Toast.error("Please upload an image");
      return;
    }

    const data = {
      title,
      content,
      country: selectedCountry,
      CategoryId: categoryId,
      url,
      keywords,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image);

    dispatch(createBlog(formData));
    navigate("/your/stories");
  };

  return (
    <>
      <Topbar />
      <div className='write'>
        <div className='write-content'>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Post Title'
          />

          <div className='write-editor-container'>
            <ReactQuill
              className='text-editor'
              theme='snow'
              value={content}
              onChange={(value) => setContent(value)} // Updated event handler
              placeholder='Write your stories'
            />
          </div>

          <input
            type='text'
            id='keyword'
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            placeholder='Keyword'
          />

          <select
            className='write-country'
            defaultValue=''
            value={selectedCountry}
            onChange={handleChangeCountry}
          >
            <option value='' disabled>
              Select a country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country.initials}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className='write-menu'>
          <div className='write-menu-item'>
            <h3>Category</h3>
            <div className='category'>
              <input
                type='radio'
                name='category'
                value='1'
                id='1'
                onChange={handleCategoryChange}
              />
              <label htmlFor='1'>Bisnis</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='2'
                id='2'
                onChange={handleCategoryChange}
              />
              <label htmlFor='2'>Ekonomi</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='3'
                id='3'
                onChange={handleCategoryChange}
              />
              <label htmlFor='3'>Teknologi</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='4'
                id='4'
                onChange={handleCategoryChange}
              />
              <label htmlFor='4'>Olahraga</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='5'
                id='5'
                onChange={handleCategoryChange}
              />
              <label htmlFor='5'>Kuliner</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='6'
                id='6'
                onChange={handleCategoryChange}
              />
              <label htmlFor='6'>Internasional</label>
            </div>

            <div className='category'>
              <input
                type='radio'
                name='category'
                value='7'
                id='7'
                onChange={handleCategoryChange}
              />
              <label htmlFor='7'>Fiksi</label>
            </div>
          </div>

          <div className='write-menu-item'>
            <h3>Publish</h3>
            <span>
              <b>Status:</b> Draft
            </span>
            <span>
              <b>Visibility:</b> Public
            </span>
            <input
              style={{ display: "none" }}
              type='file'
              id='image'
              onChange={handleImageChange}
            />
            <label className='upload-file' htmlFor='image'>
              {" "}
              Upload image
            </label>
            <span>{image && image.name}</span>
            <button className='write-menu-item-button' onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
