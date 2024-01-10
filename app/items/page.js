"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ItemCard from "../components/ItemCard/ItemCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner/Spinner";

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

  const fetchMoreData = () => {
    setSkip((oldSkip) => oldSkip + 1);
  };

  return (
    <div className="pt-8 padding-x">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMoreData}
        loader={<Spinner />}
      >
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10">
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
      </InfiniteScroll>
    </div>
  );
};

export default Items;
