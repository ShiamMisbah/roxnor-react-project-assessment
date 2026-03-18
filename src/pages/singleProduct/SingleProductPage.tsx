import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const SingleProductPage = (props: Props) => {
    const { id } = useParams();
  return (
    <div>SingleProductPage = {id}</div>
  )
}

export default SingleProductPage