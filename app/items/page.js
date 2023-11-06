"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemCard from "../components/ItemCard/ItemCard";

const Items = () => {
  const [items, setItems] = useState([]);
  const [skip, setSkip] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  useEffect(() => {
    if (!shouldRunEffect) {
      setShouldRunEffect(true);
      return;
    }
    const fetchItems = async () => {
      const response = await fetch(`/api/item/page/${skip}`);
      const json = await response.json();
      if (json.success) {
        setItems((oldItems) => [...oldItems, ...json.result]);
        if (json.result.length < 8) {
          setHasMoreData(false); // No more data to fetch
        }
      }
    };
    fetchItems();
  }, [skip, shouldRunEffect]);

  const loadMore = () => {
    setSkip((oldSkip) => oldSkip + 1);
  };

  return (
    <>
      <div className="pt-8" />
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
      {hasMoreData && (
        <div className="flex-center m-4">
          <button
            onClick={loadMore}
            className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default Items;
