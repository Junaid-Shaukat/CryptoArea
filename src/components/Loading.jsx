import React from "react";
import { ColorRing } from "react-loader-spinner";
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className="main">
      
      <div className="loader">
      <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#ffc100', '#ff9a00', '#ff7400', '#ff4d00', '#ff0000']}
  />
      </div>
     
    </div>
  );
};

export default Loading;
