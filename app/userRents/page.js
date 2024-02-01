"use client";

import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Group, Grid } from "@mantine/core";
import Link from "next/link";
import Spinner from "../components/Spinner/Spinner";

const truncateDescription = (description) => {
  return description?.length > 36 ? description.slice(0, 33) + "..." : description;
};

const ItemCard = ({ item, button, status }) => {
  const { id, title, description, price, photos } = item;
  console.log(item)
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          className="block ml-auto mr-auto"
          src={photos[0]}
          alt={id}
          h={180}
          w="auto"
          fallbackSrc="https://placehold.co/400x200?text=No%20Image"
        />
      </Card.Section>

      <Grid mt="md">
        <Grid.Col span={6}>
          <Link href={`/product/${id}`}>
            <Text justify="left" align="left" fw={500}>
              {title}
            </Text>
          </Link>
        </Grid.Col>
        <div className="col-span-2"></div>

        <Grid.Col span={6}>
          <Group justify="right" align="right">
            <p className="flex text-[32px]">
              <span className="self-start text-[14px] ">Rent: Rs</span>
              {price}
              <span className="self-end text-[14px] ">/day</span>
            </p>
          </Group>
        </Grid.Col>
      </Grid>

      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        {truncateDescription(description)}
      </Text>

      <div className="flex justify-between">
        {button ? (
          <>
            <button
              className="mt-4 w-full px-4 py-2 leading-5 font-bold text-green-700 transition-colors duration-200 transform bg-green-100 rounded focus:outline-none mr-2"
            >
              Approve
            </button>
            <button
              className="mt-4 w-full px-4 py-2 leading-5 font-bold text-red-700 transition-colors duration-200 transform bg-red-100 rounded focus:outline-none"
            >
              Deny
            </button>
          </>
        ) : (
          <button
            className="cursor-default mt-4 w-full px-4 py-2 leading-5 font-bold text-orange-fyr transition-colors duration-200 transform bg-orange-100 rounded focus:outline-none mr-2"
          >
            {status}
          </button>
        )}
      </div>
    </Card>
  );
};

const fetchRentRequests = async (token, method) => {
  const response = await fetch('/api/item/rentRequests', {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authToken: token }),
  });
  const json = await response.json();
  return json.success ? json.rentals : [];
};

const UserRents = () => {
  const [myItems, setMyItems] = useState([]);
  const [incomingItems, setIncomingItems] = useState([]);
  const [myRequestLoading, setMyRequestLoading] = useState(true);
  const [incomingLoading, setIncomingLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchRequests = async () => {
      const myItems = await fetchRentRequests(token, 'PUT');
      const incomingItems = await fetchRentRequests(token, 'POST');

      setMyItems(myItems);
      setMyRequestLoading(false);
      setIncomingItems(incomingItems);
      setIncomingLoading(false);
    };

    fetchRequests();
  }, []);

  return (
    <div className="pt-8 padding-x">
      <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
        My Rent Requests:
      </p>
      {myItems.length === 0 ? (
        <>
          <p className="text-center mt-4">Feel free to explore and request items for rent.</p>
          {myRequestLoading && <Spinner />}
        </>
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
          {myItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <ItemCard item={item.item} status={item.status} />
            </div>
          ))}
        </div>
      )}

      <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
        Incoming Rent Requests:
      </p>
      {incomingItems.length === 0 ? (
        <>
          <p className="text-center mt-4">No one is currently requesting to rent your items.</p>
          {incomingLoading && <Spinner />}
        </>
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
          {incomingItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <ItemCard item={item.item} button={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRents;
