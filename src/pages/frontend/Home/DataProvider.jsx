import React, { createContext, useEffect, useState, useCallback, useMemo } from 'react';
import CategoryServices from "../../../services/CategoryServices";
import ProductServices from '../../../services/ProductServices';
import BannerServices from '../../../services/BannerServices';

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

const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [proNew, setproNew] = useState([]);
  const [proSale, setproSale] = useState([]);
  const [sliders, setSliders] = useState([]);

  const fetchData = useCallback(debounce(async () => {
    try {
      const [reltcategories, reltbestSeller, reltpronew, reltrposale, reltsilder] = await Promise.all([
        CategoryServices.getCategoryByParentId(0),
        ProductServices.getProductBestSeller(10),
        ProductServices.getProductNew(10),
        ProductServices.getProductSale(10),
        BannerServices.getByPosition("slidershow"),
      ]);

      setCategories(reltcategories.categories);
      setBestSeller(reltbestSeller.products);
      setproNew(reltpronew.products);
      setproSale(reltrposale.products);
      setSliders(reltsilder.banners);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 300), []);  // 300ms debounce delay

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const contextValue = useMemo(() => ({ categories, bestSeller, proNew, proSale, sliders }), [categories, bestSeller, proNew, proSale, sliders]);
  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
