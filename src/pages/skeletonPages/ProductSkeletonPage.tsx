import { Skeleton } from 'antd' 
import './ProductSkeletonPage.scss'

const ProductSkeletonPage = () => {
  return (
    <div className="mainDiv_skeletal">
      <div className='top_skeletal'>
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
      </div>

      <Skeleton className="bodySkeleton" active={true} />
    </div>
  );
}

export default ProductSkeletonPage