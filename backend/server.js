const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/api/products", async (req, res) => {
  const { company, category, topValue, minPrice, maxPrice } = req.query;
  const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  var bearerToken = "";
  const bearerResponse = await axios.post("http://20.244.56.144/test/auth", {
    companyName: "SASTRA",
    clientID: "60a0f68d-d8a1-4fad-8cdf-e75b0505ae94",
    clientSecret: "wQvBkyOVBfKANXWI",
    ownerName: "Nitin Shriram",
    ownerEmail: "125156081@sastra.ac.in",
    rollNo: "125156081",
  });
  bearerToken = bearerResponse.data.access_token;
  try {
    const response = await axios.get(url, {
      params: {
        top: topValue,
        minPrice,
        maxPrice,
      },
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Error fetching data. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
