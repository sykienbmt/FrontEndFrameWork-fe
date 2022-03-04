import { Avatar, Box, Button, Chip, FormControl, InputLabel, MenuItem, NativeSelect, Select, Stack, TextField, unstable_useId } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { categoryController } from '../../../controllers/CategoryController'
import { weightController } from '../../../controllers/WeightController'
import { Category } from '../../../models/Category'
import { Product } from '../../../models/Product'
import { ProductLine } from '../../../models/ProductLine'
import { Weight } from '../../../models/Weight'
import { IoExitOutline } from 'react-icons/io5';
import './ProductAdmin.css'
import { productController } from '../../../controllers/ProductController'
import Image from '../../../models/Image'
import { Color } from '../../../models/Color'
import { UserContext } from '../../../contexts/UserContext'

const { v4: uuid } = require('uuid');

type State = {
  listCategory: Category[],
  listWeight: Weight[],
  category: Category,
  weight: Weight
  listWeightAdd: Weight[],
  listCategoryAdd: Category[],
  product: Product,
  productLine: ProductLine,
  picture: Image,
  price: number,
  colors: Color[],
  color: Color,
  isValid:boolean
}
interface Props {
  setIsShowForm: () => void,
  productLine: ProductLine,
  isEdit: boolean,
  loadProductLines: () => void
  categories: Category[],
  weights: Weight[],
  colors: Color[]

}

export default function FormAddEdit(props: Props) {
  const userContext = useContext(UserContext)

  const [state, setState] = useState<State>({
    listCategory: props.categories,
    listWeight: props.weights,
    colors: props.colors,
    category: { idCategory: "", name: "", desc: "" },
    weight: { idWeight: "", name: "" },
    listCategoryAdd: [],
    listWeightAdd: [],
    product: { idProduct: "", idProductLine: "", idWeight: "", idColor: "", price: 0 },
    productLine: props.isEdit === true ? props.productLine : {
      idProductLine: "",
      nameProduct: "",
      idCategory: "",
      sell: 0,
      desc: "",
      products: [],
      pictures: []
    },
    picture: {
      idPicture: "",
      idProductLine: "",
      image: ""
    },
    price: 0,
    color: { idColor: "", nameColor: "" },
    isValid:true
  })


  const addNewProduct = () => {
    let list = state.productLine.products.slice()
    const index = state.productLine.products.findIndex(x => x.idWeight === state.product.idWeight && x.idColor === state.product.idColor)
    if (index < 0) {
      let product = { ...state.product };
      product.idProduct = uuid();
      list.push(product)
      setState({ ...state, productLine: { ...state.productLine, products: list } })
      userContext.setMess("Add new product successfully !")
    } else {
      console.log("exists");
    }

  }

  const onClickRemoveProduct = (idProduct: string) => {
    if (props.isEdit === false) {
      let list = state.productLine.products.slice()
      const index = state.productLine.products.findIndex(x => x.idProduct === idProduct)
      if (index !== -1) list.splice(index, 1);
      setState({ ...state, productLine: { ...state.productLine, products: list } })
    } else {
      if(state.productLine.products.length>1){
        productController.deleteProduct(idProduct).then(() => {
          productController.get(state.productLine.idProductLine).then(res => {
            setState({ ...state, productLine: res, product: { idProduct: "", idProductLine: "", idWeight: "", idColor: "", price: 0 } })
          })
          props.loadProductLines()
          userContext.setMess("Delete product successfully !")
        })
      }
    }
  }

  const onClickAddImage = () => {
    let list = state.productLine.pictures.slice()
    const index = state.productLine.pictures.findIndex(x => x.image === state.picture.image)

    if (index >= 0) {
      console.log("Image exists");
    } else {
      setState({ ...state, picture: { ...state.picture, idPicture: uuid() } })
      list.push(state.picture)
      setState({
        ...state, productLine: { ...state.productLine, pictures: list }, picture: {
          idPicture: "",
          idProductLine: "",
          image: ""
        }
      })
    }
  }

  // 
  const onClickRemoveImage = (idImage: string) => {
    if (props.isEdit===true) {
      productController.deleteImage(idImage).then(() => {

        productController.get(state.productLine.idProductLine).then(res => {
          setState({ ...state, productLine: res })
        })
        props.loadProductLines()
        userContext.setMess("Delete image successfully !")
      })
    } else {
      let list = state.productLine.pictures.slice()
      list = list.filter(e => e.idPicture !== idImage);
      setState({ ...state, productLine: { ...state.productLine, pictures: list } })
    }
  }


  // Update

  const addNewProductOnUpdate = () => {
    const index = state.productLine.products.findIndex(x => x.idWeight === state.product.idWeight && x.idColor === state.product.idColor)
    console.log(index);
    
    let newProduct = { ...state.product }
    if (index < 0) {
      newProduct.idProduct = "";
      newProduct.idProductLine = state.productLine.idProductLine;
      productController.updateProduct(newProduct).then(res => {
        setState({ ...state, productLine: res })
      })
      props.loadProductLines()
      userContext.setMess("Add product successfully !")
    } else {
      productController.updateProduct(newProduct).then(res => {
        setState({ ...state, productLine: res })
      })
      props.loadProductLines()
      userContext.setMess("Update product successfully !")
    }

    
  }

  console.log(state.product);
  

  //update / add image
  const updateImage = () => {
    let imageUpdate = state.picture
    productController.updateImage(imageUpdate).then(() => {
      productController.get(state.productLine.idProductLine).then(res => {
        setState({ ...state, productLine: res })
        props.loadProductLines()
        userContext.setMess("Update Image successfully !")
      })
    })

  }

  const addNewImageOnUpdate = () => {
    let imageAdd = state.picture
    imageAdd.idPicture = ""
    productController.updateImage(imageAdd).then(() => {
      productController.get(state.productLine.idProductLine).then(res => {
        setState({ ...state, productLine: res, picture: { idPicture: "", idProductLine: "", image: "" } })
      })
    })
    props.loadProductLines()
    userContext.setMess("Add Image successfully !")
  }

  //update info productLine
  const updateProductLineInfo = () => {

    productController.updateProductLine(state.productLine).then(res => {
      props.loadProductLines()
      userContext.setMess("Update Product Line successfully !")
    })

  }

  const onClickAddProductLine = () => {
    if(state.productLine.nameProduct===""){
      userContext.setErr('Name is Require !')
      setState(prev=>({...prev,isValid:false}))
    }
    if(state.productLine.idCategory===""){
      userContext.setErr('Category is Require !')
      setState(prev=>({...prev,isValid:false}))
    }
    if(state.productLine.products.length<=0){
      userContext.setErr('Product is Require !')
      setState(prev=>({...prev,isValid:false}))
    }
    if(state.productLine.pictures.length<=0){
      userContext.setErr('Picture is Require !')
      setState(prev=>({...prev,isValid:false}))
    }
    if(state.productLine.desc===""){
      userContext.setErr('Desc is Require !')
      setState(prev=>({...prev,isValid:false}))
    }


    if(state.isValid==true){
      productController.add(state.productLine).then(() => {
        userContext.setMess("Add Product Line successfully !")
      })
      props.loadProductLines()
    }
  }

  return (
    <div className="form-admin-product" style={{ zIndex: 5 }}>
      <form action="" style={{ position: "relative" }}>

        {/* exit btn*/}
        <IoExitOutline style={{ fontSize: "20px", position: "absolute", top: 0, right: 0, cursor: "pointer" }}
          onClick={props.setIsShowForm}
        />

        {props.isEdit ? <h2>Form Edit </h2> : <h2>Form Add</h2>}

        <div className="form-input-admin">
          <TextField label="Name Product" id="outlined-size-small" size="small" sx={{ width: "100%" }}
            onChange={e => setState({ ...state, productLine: { ...state.productLine, nameProduct: e.target.value } })}
            value={state.productLine.nameProduct.toString()}
          />
        </div>

        {/* Category*/}

        <Box sx={{ width: "51%", mt: "15px", paddingRight: "15px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              value={state.productLine.idCategory.toString()}
              onChange={e => setState({ ...state, category: { ...state.category, idCategory: e.target.value }, productLine: { ...state.productLine, idCategory: e.target.value } })}
              label="Category"
            >
              {state.listCategory.length > 0 && state.listCategory.map(item => {
                return <MenuItem key={item.idCategory} value={item.idCategory}>{item.name}
                </MenuItem>
              })}
            </Select>
          </FormControl>
        </Box>

        {/* Weight input*/}

        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mt: "15px" }}>
          <FormControl sx={{ width: "25%" }} size="small">
            <InputLabel id="demo-simple-select-label">Weight</InputLabel>
            <Select
              value={state.weight.idWeight}
              defaultValue={state.product.idWeight}
              onChange={e => setState({ ...state, weight: { ...state.weight, idWeight: e.target.value }, product: { ...state.product, idWeight: e.target.value } })}
              label="Weight"
            >
              {state.listWeight.length > 0 && state.listWeight.map(item => {
                return <MenuItem key={item.idWeight} value={item.idWeight} >{item.name}</MenuItem>
              })}
            </Select>
          </FormControl>

          {/* {color-input} */}
          <FormControl sx={{ width: "24%" }} size="small">
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              value={state.color.idColor}
              defaultValue={state.product.idColor}
              onChange={e => setState(prev => ({ ...prev, color: { ...prev.color, idColor: e.target.value }, product: { ...prev.product, idColor: e.target.value } }))}
              label="Weight"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {state.colors.length > 0 && state.colors.map(item => {
                return <MenuItem key={item.idColor} value={item.idColor} ><div className='color-select-box' style={{ background: `${item.idColor} ` }}></div> {item.nameColor}</MenuItem>
              })}
            </Select>
          </FormControl>

          {/*Price*/}
          <TextField
            label="Price" size="small"
            type="number"
            sx={{ width: "25%", marginLeft: "10px", marginRight: "10px" }}
            value={Number(state.product.price)}
            onChange={(e => setState({ ...state, product: { ...state.product, price: Number(e.target.value) } }))}
          />

          {props.isEdit ?
            <>
              <Button variant="contained" size="small" onClick={addNewProductOnUpdate} >
                Update/Add
              </Button>
            </>
            :
            <Button variant="contained" size="large" onClick={addNewProduct} >
              Add Price
            </Button>}
        </Box>

        {/* List Product*/}

        <Box sx={{ mt: "15px", border: "1px solid #ddd", p: "10px", width: "100%", height: "96px" }}>
          <label htmlFor="">List Option: </label>
          {state.productLine.products.length > 0 && state.productLine.products.map(item => {
            return <Chip key={uuid()} label={`Weight: ${item.idWeight} - Price: ${item.price}`}
              sx={{ border: `2px solid ${item.idColor}` }}
              onClick={() => { setState({ ...state, product: item, weight: { ...state.weight, idWeight: item.idWeight }, color: { ...state.color, idColor: item.idColor } }) }}
              variant="outlined"
              onDelete={() => onClickRemoveProduct(item.idProduct)} />
          })}
        </Box>

        {/* image input*/}

        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mt: "15px" }}>
          <TextField label="Image"
            size="small"
            sx={{ width: "78%" }}
            value={state.picture.image}
            onChange={e => setState({ ...state, picture: { ...state.picture, image: e.target.value } })}
          />

          {props.isEdit ?
            <>
              <Button variant="contained" size="small" sx={{ width: "10%" }} onClick={() => addNewImageOnUpdate()} >
                Add
              </Button>
              <Button variant="contained" size="small" sx={{ width: "10%" }} onClick={() => updateImage()} >
                Update
              </Button>
            </>

            :
            <Button variant="contained" size="small" sx={{ width: "20%" }} onClick={() => onClickAddImage()} >
              Add Image
            </Button>
          }



        </Box>

        {/* List image*/}
        <div className="images-product-line" style={{ display: "flex", marginTop: "15px", justifyContent: "space-between" }}>

          <Box sx={{ border: "1px solid #ddd", p: "10px", width: "78%", lineHeight: "34px" }}>
            <label htmlFor="">Images: </label>
            {state.productLine.pictures.length > 0 && state.productLine.pictures.map(item => {
              return <Chip label="" variant="outlined" key={uuid()}
                onDelete={() => onClickRemoveImage(item.idPicture)}
                onClick={() => { setState({ ...state, picture: item }) }}
                avatar={<Avatar sx={{ width: "100px", height: "100px" }} alt="Remy Sharp" src={item.image} />}
              />
            })}
          </Box>
          <div className="image-product-show" style={{ width: "20%", textAlign: "right" }}>
            <img src={state.picture.image} alt="" style={{ width: "120px", height: "120px" }} />
          </div>
        </div>


        {/* Description */}

        <TextField
          label="Description"
          multiline rows={4}
          value={state.productLine.desc.toString()}
          sx={{ width: "100%", mt: "15px" }}
          onChange={e => setState({ ...state, productLine: { ...state.productLine, desc: e.target.value } })}
        />

        {/* button done*/}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "right", mt: "15px" }}>
          <Button
            variant="contained"
            size="large"
            sx={{ width: "20%" }}
            onClick={() => { props.isEdit ? updateProductLineInfo() : onClickAddProductLine() }}
          >
            {props.isEdit ? "Update" : "ADD"}
          </Button>
        </Box>

      </form>
    </div>
  )
}
