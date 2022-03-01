import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Pagination } from '../../../models/Pagination';
import ReactPaginate from 'react-paginate'
import FormAddEdit from './FormAddEdit'
import './ProductAdmin.css'
import ProductItem from './ProductItem';
import { ProductLine } from '../../../models/ProductLine';
import { productController } from '../../../controllers/ProductController';
import { Category } from '../../../models/Category';
import { categoryController } from '../../../controllers/CategoryController';
import { ProductLineContext } from '../../../contexts/ProductContext';
import { Weight } from '../../../models/Weight';
import { Color } from '../../../models/Color';
import { weightController } from '../../../controllers/WeightController';
import { colorController } from '../../../controllers/ColorController';
import { MdClear } from "react-icons/md";
const { v4: uuid } = require('uuid');

type State = {
  isShowForm: boolean,
  pagination: Pagination,
  totalPage: number
  productLines: ProductLine[],
  listCategory: Category[],
  productLine: ProductLine,
  isEdit: boolean,
  category: Category,
  weights:Weight[],
  colors:Color[],
  search:string
}

export default function ProductAdmin() {
  const productLineContext=useContext(ProductLineContext)
  const [state, setState] = useState<State>({
    isShowForm: false,
    pagination: { page: 1, perPage: 10, search: "", idCategory: "", select: "",from:0,to:1000},
    totalPage: 10,
    productLines: [],
    listCategory: [],
    productLine: {
      idProductLine: "",
      nameProduct: "",
      idCategory: "",
      sell: 0,
      desc: "",
      products: [],
      pictures: []
    },
    isEdit: false,
    category: { idCategory: "", desc: "", name: "" },
    weights:[],
    colors:[],
    search:""
  })

  useEffect(() => {
    productController.list(state.pagination).then(res => {
      setState({ ...state, totalPage: res.totalPage, productLines: res.productLines})
    })
  }, [state.pagination])

  useEffect(()=>{
    categoryController.list().then(category => {
      weightController.list().then(weight=>{
        colorController.list().then(color=>{
          setState(prev=>({...prev,listCategory:category,weights:weight,colors:color}))
        })
      })
    })
  },[])

  
  const loadProductLines=()=>{
    productController.list(state.pagination).then(res => {
      setState({ ...state, totalPage: res.totalPage, productLines: res.productLines})
    })
  }

  const setIsShowForm = () => {
    if(state.isEdit===false){
      setState({...state,productLine:{
        idProductLine: "",
        nameProduct: "",
        idCategory: "",
        sell: 0,
        desc: "",
        products: [],
        pictures: []
      }})
    }
    setState({ ...state, isShowForm: !state.isShowForm ,isEdit:false})
  }

  const setProductLineEdit = (productLine: ProductLine) => {
    setState({ ...state, productLine: productLine, isEdit: true, isShowForm: true })
  }

  const deleteProductLine=(idProductLine:string)=>{
    productController.deleteProductLine(idProductLine).then(()=>
      console.log(123)
    )
    loadProductLines()
  }

  const changeSelectOption = (select:string)=>{
    setState(prev=>({...prev,pagination:({...prev.pagination,select:select})}))
  }

  const changeSearch=()=>{ 
      setState(prev=>({...prev,pagination:({...prev.pagination,search:state.search})}))
  }

  const changeCategory=(category:string)=>{
      setState(prev=>({...prev,pagination:({...prev.pagination,idCategory:category})}))
  }

  const changePage = ({ selected }: any) => {
      setState({ ...state, pagination: { ...state.pagination, page: selected + 1 } })
  }

  const changePerPage=(number:number)=>{
      setState({ ...state, pagination: { ...state.pagination, perPage: number } })
  }

  return (
    <div className='product-admin-manager'>
      <Box sx={{ padding: "10px", height: "100%" }}>
        <Box sx={{
          width: "100%", height: "8%", backgroundColor: "rgba(250 , 250, 250,.8 )", borderRadius: "10px",
          mt: "5px", boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)", p: "10px", display: "flex", alignItems: "center",
          justifyContent: "space-between"
        }}>
          <h3>All: 100</h3>

{/* Category */}
          <FormControl sx={{ width: "25%" }}>
            <InputLabel sx={{}} id="demo-simple-select-label1">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={''}
              onChange={e=>changeCategory(e.target.value)}
              label="Category"
              value={state.pagination.idCategory}
              sx={{height:"40px"}}
            >
              <MenuItem value={""} >All</MenuItem>
              {state.listCategory.length > 0 && state.listCategory.map(item => {
                return <MenuItem key={item.idCategory} value={item.idCategory}
                >{item.name}</MenuItem>
              })}

            </Select>
          </FormControl>

{/* NewProduct */}
          <Box>
            <Button variant="outlined" sx={{}} onClick={() => setIsShowForm()}>New product</Button>
          </Box>
        </Box>

{/* ShowProduct */}
        <Box sx={{
          width: "100%",
          height: "90%",
          backgroundColor: "rgba(250 , 250, 250,.8 )",
          borderRadius: "10px",
          mt: "15px",
          boxShadow: "0px 0px 10px 3px rgb(238, 234, 234)"
        }}>
          <div className="search-product-admin-container" >
            <div className="set-product-per-page">
              <span style={{ marginRight: "5px" }}>Show </span>
              <FormControl variant="standard" sx={{ minWidth: 50, textAlign: "center", display: "inline-block" }}>
                <Select
                  value={10}
                // onChange={handleChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </Select>
              </FormControl>
              <span style={{ marginLeft: "5px" }}>Products</span>
            </div>

{/* Sort By */}
            <div></div>
            <div className="sort-bar-container">
                <div className="simple-search-admin">
                  <input type="text" placeholder="Search..." 
                    value={state.search}
                    onChange={e=>setState(prev=>({...prev,search:e.target.value}))}
                  />
                  {state.search.length>0? <MdClear onClick={()=>{setState(prev=>({...prev,search:"",pagination:{...prev.pagination,search:""}}))}} /> :""}
                  <button onClick={changeSearch}><i className="fa fa-search"></i></button>
                </div>
            </div>
            <div></div>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-helper-label2">Sort by</InputLabel>
                <Select
                  id="sort-box-shop"
                  value={state.pagination.select}
                  label="Sort by"
                  onChange={e=>changeSelectOption(e.target.value)}
                  sx={{height:"40px"}}
                >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"az"}>By Name A-Z</MenuItem>
                <MenuItem value={"za"}>By Name Z-A</MenuItem>
                <MenuItem value={"ascending"}>By Price Up</MenuItem>
                <MenuItem value={"descending"}>By Price Down</MenuItem>
                <MenuItem value={"sellUp"}>By Sell Up</MenuItem>
                <MenuItem value={"sellDown"}>By Sell Down</MenuItem>
                <MenuItem value={"createUp"}>By Create Up</MenuItem>
                <MenuItem value={"createDown"}>By Create down</MenuItem>
                </Select>
            </FormControl>
          </div>

          <div className='product-admin-container'>

            {state.productLines.length > 0 && state.productLines.map(item => {
              return <ProductItem deleteProductLine={deleteProductLine} setProductLineEdit={setProductLineEdit} key={item.idProductLine} productLine={item} />
            })}
          </div>
{/* pagination */}
          <div className="admin-pagination-product-container">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              pageCount={state.totalPage}
              onPageChange={changePage}
              containerClassName='paginationBtn'
              previousClassName='previousBtn'
              nextLinkClassName='nextBtn'
              disabledClassName='paginationDisable'
              activeClassName='paginationActive'
            />
          </div>

        </Box>
      </Box>
      {state.isShowForm === true ? <FormAddEdit 
        loadProductLines={loadProductLines} 
        isEdit={state.isEdit} 
        productLine={state.productLine} 
        setIsShowForm={setIsShowForm} 
        categories={state.listCategory}
        weights={state.weights}
        colors={state.colors}
      /> : ""}

    </div>
  )
}
