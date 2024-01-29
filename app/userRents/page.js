"use client"

import React, { useEffect, useState } from 'react'
import { Card, Image, Text, Group, Grid } from "@mantine/core";
import Link from "next/link";



const RequestItemCard = (item) => {
  let { id, title, description, price, photos } = item.item;
  if(description?.length>36){
    description = description.slice(0, 33) + "...";
  }
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
          <Link
            href={`/product/${id}`}
          >
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
        {description}
        </Text>

      <div className="flex justify-between">
        <button
          className="mt-4 w-full px-4 py-2 leading-5 font-bold text-green-700 transition-colors duration-200 transform bg-green-100 rounded focus:outline-none mr-2"
        // onClick={() => {
        //   onOpenModal();
        // }}
        >
          Approve
        </button>
        <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-red-700 transition-colors duration-200 transform bg-red-100 rounded focus:outline-none"
        // onClick={() => {
        //   onDeleteItem();
        // }}
        >
          Deny
        </button>
      </div>
    </Card>
  );
};

const UserRents = () => {
  const [shouldRunEffect, setShouldRunEffect] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!shouldRunEffect) {
      setShouldRunEffect(true);
      return;
    }
    const fetchItems = async () => {
      const response = await fetch('/api/item/rentRequests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authToken: token })
      });
      const json = await response.json();
      if (json.success) {
        console.log(json.rentals)
        setItems(json.rentals);
      }
    };
    fetchItems();
  }, [shouldRunEffect]);

  return (
    <div className="pt-8 padding-x">
      <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
        Incoming Rent Requests:
      </p>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
        {items.map((item) => (
          <div key={item.id} className="col-md-4">
            <RequestItemCard item={item.item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserRents