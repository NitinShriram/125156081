import React, { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [formData, setFormData] = useState({
    company: "AMZ",
    category: "Phone",
    topValue: "10",
    minPrice: "",
    maxPrice: "",
  });

  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company, category, topValue, minPrice, maxPrice } = formData;
    const apiUrl = "http://localhost:5000/api/products";

    try {
      const response = await axios.get(apiUrl, {
        params: {
          company,
          category,
          topValue,
          minPrice,
          maxPrice,
        },
      });

      setFetchedData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              Company
            </label>
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="AMZ">AMZ</option>
              <option value="FLP">FLP</option>
              <option value="SNP">SNP</option>
              <option value="MYN">MYN</option>
              <option value="AZO">AZO</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md sm:text-sm"
            >
              <option value="Phone">Phone</option>
              <option value="Computer">Computer</option>
              <option value="TV">TV</option>
              <option value="Earphone">Earphone</option>
              <option value="Tablet">Tablet</option>
              <option value="Charger">Charger</option>
              <option value="Mouse">Mouse</option>
              <option value="Keypad">Keypad</option>
              <option value="Bluetooth">Bluetooth</option>
              <option value="Pendrive">Pendrive</option>
              <option value="Remote">Remote</option>
              <option value="Speaker">Speaker</option>
              <option value="Headset">Headset</option>
              <option value="Laptop">Laptop</option>
              <option value="PC">PC</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="topValue"
              className="block text-sm font-medium text-gray-700"
            >
              Top Value
            </label>
            <input
              type="text"
              id="topValue"
              name="topValue"
              value={formData.topValue}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Min Price
            </label>
            <input
              type="text"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Max Price
            </label>
            <input
              type="text"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Submit
          </button>
        </form>

        {fetchedData && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Fetched Data</h2>
            <div className="bg-gray-200 p-4 rounded-md">
              {fetchedData.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 mb-4 rounded-md"
                >
                  <h3 className="text-lg font-bold mb-2">{item.productName}</h3>
                  <p className="text-gray-700">Rating: {item.rating}</p>
                  <p className="text-gray-700">Discount: {item.discount}</p>
                  <p className="text-gray-700">
                    Availability: {item.availability}
                  </p>
                  <p className="text-gray-500 mt-2">Price: ${item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPage;
