import React from 'react'
import { useGetProductsQuery } from '../../state/product/productApiSlice'

type Props = {}

const ProductPage = (props: Props) => {
    const {data: productData, isLoading, isError} = useGetProductsQuery({})
    console.log(productData);
    
  if (isLoading) return <div>Is loading</div>
  if (isError) return <div>Is Error</div>;
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage