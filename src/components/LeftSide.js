import { React, useState } from 'react'
import "./leftSide.css"
import logo1 from "../images/logo1.png"

const LeftSide = (props) => {
  const { search, setSearch, filters, setFilters } = props

  const [priceFilter, setPriceFilter] = useState({
    min: "",
    max: ""
  })

  const [categoryFilter, setCategoryFilter] = useState({
    comics: false,
    sports: false,
    knowledge: false
  })
  const [inputValue, setInputValue] = useState("");

  const searchClick = (e) => {
    setSearch(inputValue)
  }

  const handleOnChange = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
  }

  const handlePriceBlur = (e) => {
    console.log(e.target.id)
    console.log(e.target.value)
    setPriceFilter({ ...priceFilter, [e.target.id]: e.target.value })
    console.log(priceFilter)
  }

  const handleCheckboxChange = (e) => {
    const obj = {
      comics: false,
      sports: false,
      knowledge: false
    }
    setCategoryFilter({ ...obj, [e.target.id]: e.target.checked })
    console.log(obj)
  }
  const checked = true;

  const applyFilters = (e) => {
    console.log(priceFilter)
    console.log(categoryFilter)
    setFilters({ ...filters, price: priceFilter, category: categoryFilter });
    setPriceFilter({
      min: "",
      max: ""
    })

    setCategoryFilter({
      comics: false,
      sports: false,
      knowledge: false
    })
  }
  return (
    <div className="left-container">
      <div className="logo">
        <img src={logo1} alt="logo1" />
      </div>
      <div className="search">
        <input onChange={handleOnChange} type="text" />
        <button onClick={searchClick}>Search Books</button>
      </div>
      <div className="filters">
        <h2>Filters</h2>
        <div className="subHeading">Price</div>
        <span style={{ marginLeft: "1vw" }}>min: <input className="max" value={priceFilter.min} onChange={handlePriceBlur} id="min" type="Number" /></span>
        <span style={{ marginLeft: "1vw" }}>max: <input className="max"  value={priceFilter.max} id="max" onChange={handlePriceBlur}  type="Number" /></span>
        <div style={{ marginTop: "1vh" }} className="subHeading">Category</div>
        <div onChange={handleCheckboxChange} className="checkbox-elements">Comics<input checked={categoryFilter.comics} id="comics" type="checkbox" /><br /></div>
        <div onChange={handleCheckboxChange} className="checkbox-elements">Sports<input checked={categoryFilter.sports} id="sports" type="checkbox" /><br /></div>
        <div onChange={handleCheckboxChange} className="checkbox-elements">Knowledge<input checked={categoryFilter.knowledge} id="knowledge" type="checkbox" /><br /></div>
        <button onClick={applyFilters} className="filter-button">Apply Filters</button>
      </div>
    </div>
  )
}

export default LeftSide