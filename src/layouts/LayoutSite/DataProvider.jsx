import React, { createContext, useState } from 'react';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState("Your data here");
    const [menus, setMenus] = useState([]);
    const [topics, setTopics] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [brandsResult, categoriesResult, attributesResult] = await Promise.all([
                    BrandServices.getAll(),
                    CategoryServices.getAll(),
                    AttributeServices.getAll(),
                  ]);
                  setBrands(brandsResult.brandsAll);
                  setCategories(categoriesResult.categoriesAll);
                  setAttributes(attributesResult.attributesAll);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading state to false regardless of success or error
            }
        };

        fetchData();
    }, []);
    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;