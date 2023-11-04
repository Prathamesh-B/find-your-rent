"use client";

import { Card, Image, Text, Badge, Button, Group, Grid } from "@mantine/core";
import Link from "next/link";

const ItemCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
          height={50}
          alt="Norway"
        />
      </Card.Section>

      <Grid mt="md">
        <Grid.Col span={6}>
          <Text justify="left" align="left" fw={500}>
            Item Name
          </Text>
        </Grid.Col>
        <div className="col-span-2"></div>

        <Grid.Col span={6}>
          <Group justify="right" align="right">
            <p className="flex text-[32px]">
              <span className="self-start text-[14px] ">Rent: Rs</span>
              0.0
              <span className="self-end text-[14px] ">/day</span>
            </p>
          </Group>
        </Grid.Col>
      </Grid>

      <Text size="sm" c="dimmed" mt="xs" mb="xs">
        Description of the Item(in Brief)
      </Text>

      <Text fw={400}>Owner Name</Text>

      <Link href="/product">
        <Button
          variant="light"
          color="rgba(238, 147, 34, 1)"
          fullWidth
          mt="md"
          radius="md"
        >
          View More
        </Button>
      </Link>
    </Card>
  );
};

export default ItemCard;
