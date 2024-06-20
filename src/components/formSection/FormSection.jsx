import { useState } from "react";
import { useGetPositions, useUploadUser } from "../../api/react-queries";
import "./formSectionStyles.scss";
import Button from "../button/Button";

function FormSection() {
  const { data, isSuccess } = useGetPositions();
  const { mutate } = useUploadUser();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: e.target.files[0],
    }));
  };

  const validate = () => {
    let errors = {};
    if (
      !formData.name ||
      formData.name.length < 2 ||
      formData.name.length > 60
    ) {
      errors.name = "Name must be between 2 and 60 characters";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    const phoneRegex = /^\+380\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must start with +380 and contain 9 digits";
    }
    if (!formData.position_id) {
      errors.position_id = "Please select a position";
    }
    if (!formData.photo) {
      errors.photo = "Please upload a photo";
    } else if (
      formData.photo.size > 5 * 1024 * 1024 ||
      !["image/jpeg", "image/jpg"].includes(formData.photo.type)
    ) {
      errors.photo = "Photo must be a JPG/JPEG image and not exceed 5MB";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      mutate(formData, {
        onSuccess: () => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            position_id: "",
            photo: null,
          });
        },
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <section className="form-section">
      <h1 className="title">Working with POST request</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="name-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="email-input">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="tel-input">
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="radio-buttons-container">
          <p>Select your position</p>
          <div className="radio-buttons">
            {isSuccess &&
              data.positions?.map((position) => (
                <label key={position.id}>
                  <input
                    type="radio"
                    name="position_id"
                    value={position.id}
                    checked={formData.position_id === String(position.id)}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  {position.name}
                </label>
              ))}
          </div>
          {errors.position_id && <p className="error">{errors.position_id}</p>}
        </div>
        <div className="file-container">
          <label className="file">
            <input
              type="file"
              id="photo"
              name="photo"
              aria-label="File browser example"
              onChange={handleFileChange}
            />
            <span className="file-custom">Upload</span>
            <span className="file-custom-2">Upload your photo</span>
            {errors.photo && <p className="error">{errors.photo}</p>}
          </label>
        </div>
        <Button
          disabled={
            !formData.email ||
            !formData.name ||
            !formData.phone ||
            !formData.photo ||
            !formData.position_id
          }
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </section>
  );
}

export default FormSection;
