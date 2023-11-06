"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemCard from "../components/ItemCard/ItemCard";

const Items = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  useEffect(() => {
    if (!shouldRunEffect) {
      setShouldRunEffect(true)
      return
    }
      const fetchItems = async () => {
        const response = await fetch(`/api/item/page/${page}`);
        console.log("Fetched");
        const json = await response.json();
        if (json.success) {
          setItems((oldItems) => [...oldItems, ...json.result]);
        }
      };
      fetchItems();
  }, [page, shouldRunEffect]);

  const loadMore = () => {
    setPage((oldPage) => oldPage + 1);
  };

  return (
    <div className="py-8">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10 px-7">
        {items?.map((item) => (
          <div className="col-md-4" key={uuidv4()}>
            <ItemCard
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              photos={item.photos[0]}
            />
          </div>
        ))}
      </div>
      <div className="flex-center mt-8">
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default Items;
