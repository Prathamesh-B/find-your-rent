"use client";

import { Card, Image, Text, Group, Grid } from "@mantine/core";
import Link from "next/link";

const ItemCard = (props) => {
    let { title, description, price, id, photos } = props;
    if (description.length > 36) {
        description = description.slice(0, 30) + "...";
    }
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    className="block ml-auto mr-auto"
                    src={photos}
                    alt={id}
                    h={180}
                    w="auto"
                    fallbackSrc="https://placehold.co/400x200?text=No%20Image"
                />
            </Card.Section>

            <Grid mt="md">
                <Grid.Col span={6}>
                    <Text justify="left" align="left" fw={500}>
                        {title}
                    </Text>
                </Grid.Col>
                <div className="col-span-2"></div>

                <Grid.Col span={6}>
                    <Group justify="right" align="right">
                        <p className="flex text-[32px]">
                            <span className="self-start text-[14px] ">
                                Rent: Rs
                            </span>
                            {price}
                            <span className="self-end text-[14px] ">/day</span>
                        </p>
                    </Group>
                </Grid.Col>
            </Grid>

            <Text size="sm" c="dimmed" mt="xs" mb="xs">
                {description}
            </Text>

            <Link href={`/product/${id}`}>
                <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-orange-fyr transition-colors duration-200 transform bg-orange-100 rounded focus:outline-none">
                    View More
                </button>
            </Link>
        </Card>
    );
};

export default ItemCard;
