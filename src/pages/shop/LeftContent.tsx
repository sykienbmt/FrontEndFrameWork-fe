import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useContext } from 'react'
import ReactPaginate from 'react-paginate'
import { ProductLineContext } from '../../contexts/ProductContext'
import ItemProduct from './ItemProduct'
import './ItemProduct.css'

export default function LeftContent() {
  const productLineContext = useContext(ProductLineContext)

  return (
    <div className="shop-left-container padding-container">
      <div className="shop-sort-container padding-container">
        <p>Showing 1–12 of 45 results</p>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-simple-select-helper-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="sort-box-shop"
            value={productLineContext.pagination.select}
            label="Sort by"
            onChange={e => productLineContext.changeSelectOption(e.target.value)}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"az"}>By Name A-Z</MenuItem>
            <MenuItem value={"za"}>By Name Z-A</MenuItem>
            <MenuItem value={"ascending"}>By Price Up</MenuItem>
            <MenuItem value={"descending"}>By Price Down</MenuItem>
            <MenuItem value={"sellUp"}>By Sell Up</MenuItem>
            <MenuItem value={"sellDown"}>By Sell Down</MenuItem>
          </Select>
        </FormControl>
      </div>


      {productLineContext.productLines.length > 0 ?
        <div className="shop-products-container" >
          {productLineContext.productLines.length > 0 && productLineContext.productLines.map(item => {
            return <ItemProduct key={item.idProductLine} productLine={item} />
          })}
        </div>
        : <div className='shop-search-null'>
          <img src="https://www.svgrepo.com/show/125907/new-product.svg" style={{ width: "100px" }} alt="" />
          <h2>Do not find the product according to your requirements</h2>
        </div>
      }

      {productLineContext.productLines.length > 0 ?
        <div className="admin-pagination-product-container">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={productLineContext.totalPage}
            onPageChange={productLineContext.changePage}
            containerClassName='paginationBtn'
            previousClassName='previousBtn'
            nextLinkClassName='nextBtn'
            disabledClassName='paginationDisable'
            activeClassName='paginationActive'
          />
        </div>
        : ""
      }

    </div>
  )
}
