import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import CategoryServices from "../../../services/CategoryServices";
import ProductServices from '../../../services/ProductServices';
import BannerServices from '../../../services/BannerServices';
import PostServices from '../../../services/PostServices';

export const DataContext = createContext();

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const fetchDataWithRetry = async (retryCount = 3, delay = 500) => {
  try {
    const [reltcategories, reltbestSeller, reltpronew, reltrposale, reltsilder, reltpost] = await Promise.all([
      CategoryServices.getCategoryByParentId(0),
      ProductServices.getProductBestSeller(10),
      ProductServices.getProductNew(10),
      ProductServices.getProductSale(10),
      BannerServices.getByPosition("slidershow"),
      PostServices.getByType(4, 'post'),
    ]);

    return {
      categories: reltcategories.categories,
      bestSeller: reltbestSeller.products,
      proNew: reltpronew.products,
      proSale: reltrposale.products,
      sliders: reltsilder.banners,
      posts: reltpost.posts,
    };
  } catch (error) {
    if (retryCount === 0) throw error;
    await new Promise(res => setTimeout(res, delay));
    return fetchDataWithRetry(retryCount - 1, delay * 2); // Exponential backoff
  }
};

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [proNew, setproNew] = useState([]);
  const [proSale, setproSale] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [posts, setposts] = useState([]);

  const fetchData = useCallback(debounce(async () => {
    try {
      const data = await fetchDataWithRetry();
      setCategories(data.categories);
      setBestSeller(data.bestSeller);
      setproNew(data.proNew);
      setproSale(data.proSale);
      setSliders(data.sliders);
      setposts(data.posts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 1000), []);  // Increased debounce delay to 1000ms

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(() => ({ categories, bestSeller, proNew, proSale, sliders, posts }), [categories, bestSeller, proNew, proSale, sliders, posts]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
