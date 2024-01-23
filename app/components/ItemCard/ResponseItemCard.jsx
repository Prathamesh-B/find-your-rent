"use client";

import { Card, Image, Text, Group, Grid, Badge } from "@mantine/core";
import Link from "next/link";

const ItemCard = () => {
  // let { title, description, price, id, photos, onOpenModal, onDeleteItem } = props;
  // if(description.length>36){
  //   description = description.slice(0, 33) + "...";
  // }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          className="block ml-auto mr-auto"
          src={"https://placehold.co/400x200?text=No%20Image"}
          // alt={id}
					alt={"photo"}
          h={180}
          w="auto"
          fallbackSrc="https://placehold.co/400x200?text=No%20Image"
        />
      </Card.Section>

      <Grid mt="md">
        <Grid.Col span={6}>
          <Link 
					// href={`/product/${id}`}
					href={'/items'}
					>
          <Text justify="left" align="left" fw={500}>
            {/* {title} */}
						Title
          </Text>
          </Link>
        </Grid.Col>
        <div className="col-span-2"></div>

        <Grid.Col span={6}>
          <Group justify="right" align="right">
            <p className="flex text-[32px]">
              <span className="self-start text-[14px] ">Rent: Rs</span>
              {/* {price} */}
							50
              <span className="self-end text-[14px] ">/day</span>
            </p>
          </Group>
        </Grid.Col>
      </Grid>
      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        {/* {description} */}
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do...
      </Text>
        <Text justify="left" align="left" fw={500}>
					Status: 
        </Text>
        <Badge fullWidth color="orange" variant="light" size="xl">Pending...</Badge>
    </Card>
  );
};

export default ItemCard;