import React, { useState } from 'react'
import ProductTableRow from './ProductTableRow';
import { ICompnayProducts } from "../../../../../../services/utils/api/models";
import {ICategoryTree} from "../../../../../../services/utils/api/Category/models";
interface IProps {
  products: ICompnayProducts[] | undefined
  CategoryProducts:ICategoryTree[] | undefined
}

const ProductTable: React.FC<IProps> = ({ products,CategoryProducts }) => {
  const [filter,setFilter]=useState<string>("");
  const handleProducts=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setFilter(e.target.value)
  }
  console.log(products);
  
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-6">
              <h5 className="card-title">محصولات</h5>
            </div>
            <div className="col-6">
              <h5 className="card-title" style={{display:"inline",marginLeft:"10px"}}>جستجو</h5>
              <select onChange={handleProducts}>
                <option value="" disabled selected> بر اساس</option>
                {CategoryProducts?.map(category=><option >{category.title}</option>)}
                <option value="">همه محصولات</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover no-wrap">
            <thead style={{ backgroundColor: 'oldlace' }}>
              <tr>
                <th>ردیف</th>
                <th>دسته بندی محصول</th>
                <th>نام محصول</th>
                <th>قیمت</th>
                <th>وضعیت</th>
                <th>تنظیمات</th>
              </tr>
            </thead>
            <tbody>
              {products?.filter(product=>product.category_title===filter || filter==="")?.map((product,index) => (
                <ProductTableRow
                  productId={product.id}
                  productName={product.name}
                  productCategory={product.category_title}
                  productPrice={product.cost}
                  productStatus={product.status}
                  productNumber={index+1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductTable
