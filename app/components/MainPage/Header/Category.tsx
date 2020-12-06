import React, { useState, useEffect } from "react";
import { useQuery } from 'react-query';
import styles from './Category.module.css';
import Link from 'next/link';
import { axiosInstance as axios } from '../../../services/axios/axios';


// bookmarked by pouria 
// should be changed => url variable, parrent property should be added
// qestions => are all categories a link too ?

// - - - - - containing 2 components


const ListItem = (props: Pick<Categories, "children" | "id" | "title">) => {
  const [show, setShow] = React.useState(false);

  return (
    <li className={`${styles.listItem} ${show ? styles.listItemToggle : ""}`}>
      <div className={styles.listItemContent} onClick={() => setShow(prev => !prev)}>
        <div className = {styles.ListItemTitle}>{props.title}</div>
        {props.children.length ? <span className={styles.arrow}>&rsaquo;</span> : null}
      </div>
      <ul className={styles.innerList}>
        {props.children.map((value, index) => (
          <ListItem children={value.children} key={index} id={value.id} title={value.title} />
        ))}
      </ul>
    </li>
  );
}


type Categories = {
  id: number;
  children: Categories[];
  title: string;
  type: string;
  parent: null
}

interface IProps {
  isShow: boolean;
  categories: Categories[]
}


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

  // - - -  calling a recursive Cmp extract all nested categories

  const extractCategoriesHandle = (arr: Categories[]) => {
    return <ul className={styles.innerList}>
      {arr.map((element) => (
        <ListItem key={element.id} children={element.children} id={element.id} title={element.title} />
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
          <div style={{ margin: "0 3px", overflow:"hidden"}}>
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

  // - - - - - - - - serverSide rendering

const fetchData = async () => {
  const res = await axios.get('/data_bank/admin/category/')
  return res.data
}

export async function getStaticProps() {
  const categories = await fetchData()
  return { props: { categories } }
}

