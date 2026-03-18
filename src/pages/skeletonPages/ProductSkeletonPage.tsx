import { Skeleton } from 'antd' 
import './ProductSkeletonPage.scss'

const ProductSkeletonPage = () => {
  return (
    <div className="mainDiv">
      <Skeleton.Input
        className="searchBarSkeleton"
        active={true}
        size="large"
      />
      <Skeleton.Input
        className="dropDownBarSkeleton"
        active={true}
        size="large"
      />
      <Skeleton className="bodySkeleton" active={true} />
    </div>
  );
}

export default ProductSkeletonPage