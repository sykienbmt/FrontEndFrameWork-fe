import { Box,Slider } from '@mui/material';
import React, { useContext } from 'react'
import { FaSearch,FaAngleRight } from 'react-icons/fa'
import { ProductLineContext } from '../../contexts/ProductContext';
import { Category } from '../../models/Category'
import { MdClear } from "react-icons/md";

interface Props{
    categories:Category[]
}

type State={
    search:string,
    range:number[]
}

export default function RightContent(props:Props) {
    const productLineContext= useContext(ProductLineContext)

    const [state, setState] = React.useState<State>({search:"",range:[0, 1000]});

    const minDistance = 5;

    const handleChange1 = ( event: Event, newValue: number | number[], activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (activeThumb === 0) {
            setState(prev=>({...prev,range:[Math.min(newValue[0], state.range[1] - minDistance), state.range[1]]}));
        } else {
            setState(prev=>({...prev,range:[state.range[0], Math.max(newValue[1], state.range[0] + minDistance)]}));
        }
    };

    
    return (    
        <div className="shop-right-container padding-container">
            <div className="shop-search-box">
            <div className="simple-search">
                <input type="text" placeholder="Search..." 
                    value={state.search}
                    onChange={e=>setState(prev=>({...prev,search:e.target.value}))}
                />
                
                {state.search.length>0? <MdClear className='svg-search-user' onClick={()=>{
                    setState(prev=>({...prev,search:""}));
                    productLineContext.changeSearch("")
                }} /> :""}

                <button onClick={()=>productLineContext.changeSearch(state.search)}><FaSearch /></button>
            </div>
            </div>

            <div className="category-shop-container">
                <h3>Categories</h3>
                <ul className="categories-shop-show">
                    <li  className='item-categories-shop'><p style={{width:"100%"}}
                        onClick={()=>productLineContext.changeCategory("")}
                        >
                        <FaAngleRight /> All</p>
                    </li>
                    {props.categories.length>0 &&props.categories.map(item=>{
                        return <li key={item.idCategory} className='item-categories-shop'
                                    onClick={()=>productLineContext.changeCategory(item.idCategory)}
                                    >
                                    <p style={{width:"100%"}}><FaAngleRight /> {item.name}</p>
                                </li>
                    })}
                </ul>

                <h3>Filter By Price</h3>
                <Box sx={{ width: "100%",mt:"40px" }}>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={state.range}
                    onChange={handleChange1}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    sx={{color:'#76A822'}}
                />
                </Box>
                <div className="filer-by-range-container">
                    <button className="filer-range" onClick={()=>productLineContext.changeRange(state.range)}>Filter</button>
                    <p>Price: $ {state.range[0]} - $ {state.range[1]} </p>
                </div>
                
            </div>

        </div>
    )
}
function valuetext(value: number) {
    return `${value}°C`;
  }