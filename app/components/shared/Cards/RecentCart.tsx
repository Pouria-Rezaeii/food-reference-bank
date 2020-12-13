import React from "react";

interface IProps {
    name :string
    price : number 
    image :string
}

const RecentCart:React.FC<IProps> = ({name , price , image}) => {
  return (
    <div className="post_footer">
      <div className="post_img">
          <img src={image} alt="letest_post1" />
      </div>
      <div className="post_content">
        <h6>
          {/* <a href="#">{name}</a> */}
          {name}
        </h6>
        <p className="small m-0">
            قیمت : {price.toFixed(2)} تومان
        </p>
      </div>
    </div>
  );
};

export default RecentCart;
