import { React, useEffect, useState } from "react";
import "./RightSide.css";
import random from "../images/random.png";

const RightSide = (props) => {
  const { search, setSeacrh, filters, setFilters } = props;
  const apiKey = "AIzaSyCUSYrecJV2POZWbtZWWhE9l5R8FXxF-f8";
  let response;

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("ALl");
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);

  async function fetchData(search) {
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${
        search ? search : keyword
      }&orderBy=newest&key=${apiKey}&maxResults=${page}&startIndex=${index} `
    );
    response = await data.json();
    console.log(response);
    setData(response.items);
    setTotalItems(response.totalItems);
  }

  async function fetchFilterData(filters) {
    const { comics, sports, knowledge } = filters.category;
    const { min, max } = filters.price;

    let data;

    if (comics || sports || knowledge) {
      function whichFilterToApply() {
        if (filters.category.comics) return "comics";
        else if (filters.category.sports) return "sports";
        else return "knowledge";
      }
      data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${whichFilterToApply()}&orderBy=newest&key=${apiKey}&maxResults=${page}`
      );

      response = await data.json();
      console.log(response);

      let filteredResponse;
      let priceFiltered = [];
      if (min !== "" || max !== "") {
        console.log("min", min, max);

        filteredResponse = response.items.filter((e) => {
          return e.saleInfo.saleability !== "NOT_FOR_SALE";
        });

        filteredResponse.map((e)=>{
          console.log("inside pricefilter")
          console.log(e.saleInfo.retailPrice.amount)
          if(e.saleInfo.retailPrice.amount>min && e.saleInfo.retailPrice.amount<max){
            priceFiltered.push(e)
          }
        })
        // console.log(priceFiltered)
      }

      setData(priceFiltered);
    }
  }

  useEffect(() => {
    console.log("i am inside use effect");
    console.log(search);
    fetchData(search);
  }, [index, page, search]);

  useEffect(() => {
    console.log("filter use effect");
    fetchFilterData(filters);
  }, [filters]);

  const onPrevClick = () => {
    setIndex(index - 10);
    console.log(index);
  };

  const onNextClick = () => {
    setIndex(index + 10);
    console.log(index);
  };

  const handleBlur = (e) => {
    console.log(e.target.value);
    setPage(e.target.value);
  };

  return (
    <div className="rightContainer">
      <h2 >Books Here...</h2>
      <div className="boksContainer">
        {data.length &&
          data.map((element) => {
            return (
              <div className="box">
                <img
                  src={
                    element.volumeInfo.readingModes.image
                      ? element.volumeInfo.imageLinks.thumbnail
                      : random
                  }
                  alt="thumbnail"
                />

                <div className="infoContainer">
                  <div className="title">
                    <b>Title</b> : {element.volumeInfo.title.length>35?element.volumeInfo.title.slice(0,30):element.volumeInfo.title}
                  </div>
                  <div className="author">
                    <b>Author</b>:{" "}
                    {element.volumeInfo.authors
                      ? element.volumeInfo.authors[0]
                      : "Not Mentioned"}
                  </div>
                  <div className="publisher">
                    <b>Publisher</b>: {element.volumeInfo.publisher}
                  </div>
                  <div className="price">
                    <b>Price</b>:{" "}
                    {element.saleInfo.saleability == "FOR_SALE"
                      ? element.saleInfo.retailPrice.amount + " INR"
                      : "nOT fOR SALE"}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="btn">
        <input onBlur={handleBlur} type="number" />
        <span>Results Per Page</span>
        <button
        className="btn1"
          disabled={index == 0 ? true : false}
          onClick={onPrevClick}
        >
          Prev
        </button>
        <button
        className="btn2"
          disabled={index >= totalItems ? true : false}
          onClick={onNextClick}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RightSide;
