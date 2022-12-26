import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import React from "react";
import './EditAttraction.css'
const CategoryList = ({setCategory, setActiveStep}) => {
    const categories = useSelector(state => state.categoriesArr)
return (
 <div className="product-list" style={{marginTop:"-4rem"}}>
    {categories.map(item => <div key={item.Id} className="container-category" onClick={() => { setCategory(item); setActiveStep(1); }}>
      <CategoryCard item={item} /></div>)}
  </div>
)
}
export default CategoryList;