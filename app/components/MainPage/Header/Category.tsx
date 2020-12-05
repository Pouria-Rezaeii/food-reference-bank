import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import styles from './Category.module.css';
import Link from 'next/link';
import { axiosInstance as axios } from '../../../services/axios/axios'

interface IProps {
  isShow: boolean;
  categories?: any
}


// bookmarked by pouria 
// should be changed => categories type, axiosInstance, url variable, userAuthentication
// qestions => are all categories a link too ?


const Category: React.FC<IProps> = ({ isShow, categories }) => {
  const [showMore, setShowMore] = useState(false);


  const { data } = useQuery('categories', fetchData, { initialData: categories })

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const [smallScreen, setsmallScreen] = useState(false);
  useEffect(() => {
    setsmallScreen(window.innerWidth < 991);
    const handleResize = () => {
      if (window.innerWidth < 991) {
        setsmallScreen(true);
      } else {
        setsmallScreen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // a recursive function to extract all nested categories

  const extractCategoriesHandle = (arr: any) => {
    return <ul className={styles.innerList}>
      {arr.map((element, index) => (
        <li className={styles.listItem} key={index}>
          <div className={styles.listItemContent}>
            <Link href={element.title}><a>{element.title}</a></Link>
            {element.children.length ? <span className={styles.arrow}>&rsaquo;</span> : null}
          </div>
          {element.children.length ? extractCategoriesHandle(element.children) : null}
        </li>
      ))}
    </ul>
  }

  const extractedCategories = data ? extractCategoriesHandle(data) : null


  // - - - - - - - - returning JSX - - - - - - - - - - 


  return (
    <>
      <div
        id="navCatContent"
        className={`${styles.listBox} ${isShow ? "show" : ""}`}
      >
        <ul className={styles.list}>
          {smallScreen && <li className={styles.more} >همه دسته بندی ها </li>}
          <div style = {{padding: "0 1px 0 12px"}}>
            {extractedCategories}
          </div>
        </ul>
        <div
          className={`more_categories ${showMore ? "show" : ""}`}
          onClick={handleToggleShowMore}
        >
          دسته بندی بیشتر
      </div>
      </div>
    </>
  );
};

export default Category;

const fetchData = async () => {
  const res = await axios.get('/data_bank/admin/category/')
  return res.data
}

export async function getStaticProps() {
  const categories = await fetchData()
  return { props: { categories } }
}

