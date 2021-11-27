import "./App.css";
import Select from "@material-ui/core/Select";
import axios from "axios";
// const axios = require("axios");
import React, { useEffect, useState } from "react";
import NewsAPI from "newsapi";
import Cards from "./Cards";
const newsapi = new NewsAPI("e36bbd6a4c004730810be973c6e4a00f");

function App() {
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (countryList.length == 0) {
      axios
        .get("https://countriesnow.space/api/v0.1/countries/iso")
        .then(function (res) {
          if (res.status == 200) {
            setCountryList([...res.data.data]);
          }
          // handle success
          console.log(res);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  });

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=e36bbd6a4c004730810be973c6e4a00f`
      )
      .then(function (res) {
        console.log("news", res);
        if (res.data.status == "ok") {
          setNews([...res.data.sources]);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [country]);
  return (
    <div style={{ margin: "30px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>News Apps</h1>
        <select
          style={{
            height: "30px",
          }}
          value={country ? country.toUpperCase() : ""}
          onChange={(e) => setCountry(e.target.value.toLowerCase())}
        >
          <option></option>
          {countryList.map((key) => (
            <option value={key.Iso2}>{key.name}</option>
          ))}
        </select>
      </header>
      <div class="grid-container">
        {news.map((news) => (
          <Cards {...news} />
        ))}
      </div>
    </div>
  );
}

export default App;
