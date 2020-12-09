import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import "../assets/css2/global.css";
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import React from 'react'
// import "../assets/css/animate-rtl.css"
// import "../assets/bootstrap/css/bootstrap-rtl.min.css"
// import "../assets/css/all-rtl.min.css";
// import "../assets/css/ionicons-rtl.min.css";
// import "../assets/css/themify-icons-rtl.css";
// import "../assets/css/linearicons-rtl.css";
// import "../assets/css/flaticon-rtl.css";
// import "../assets/css/simple-line-icons-rtl.css";
// import "../assets/css/magnific-popup-rtl.css";
// import "../assets/css/slick-rtl.css";
//
// import "../assets/owlcarousel/css/owl.carousel.min.css"
// import "../assets/owlcarousel/css/owl.theme.css"
// import "../assets/owlcarousel/css/owl.theme.default.min.css"
//
// import "../assets/css/style-rtl.css";
// import "../assets/css/responsive-rtl.css";
//
//
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

{
  /* <link rel="stylesheet" href="assets/owlcarousel/css/owl.carousel.min.css">
<link rel="stylesheet" href="assets/owlcarousel/css/owl.theme.css">
<link rel="stylesheet" href="assets/owlcarousel/css/owl.theme.default.min.css"> */
}
const queryCache = new QueryCache()
export const MyApp:React.FC<AppProps> =({ Component, pageProps }) =>{
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </ReactQueryCacheProvider>
  )
}

export default MyApp;
// export default wrapper.withRedux(MyApp);
