"use client";

import { Card, Image, Text, Group, Grid } from "@mantine/core";
import Link from "next/link";
import { LuX } from "react-icons/lu";

const truncateDescription = (description) => {
    return description?.length > 36
        ? description.slice(0, 30) + "..."
        : description;
};

const ItemCard = ({
    item,
    button,
    status = "Not Available",
    onApprove,
    onDeny,
    onCancel,
    rentId,
}) => {
    const { id, title, description, price, photos } = item;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                {(status === "Pending" || status === "Denied") && !button && (
                    <div className="absolute top-0 right-0 p-1 bg-red-600 text-white cursor-pointer rounded-bl-md">
                        <LuX
                            onClick={() => {
                                onCancel(rentId);
                                showNotification({
                                    id: "request",
                                    autoClose: false,
                                    color: "cyan",
                                    title: "Loading",
                                    message: "Waiting for server",
                                    loading: true,
                                });
                            }}
                        />
                    </div>
                )}
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
                {truncateDescription(description)}
            </Text>

            <button
                className={`cursor-default mt-4 w-full px-4 py-2 leading-5 font-bold transition-colors duration-200 transform rounded focus:outline-none ${
                    status === "Pending"
                        ? "text-yellow-500 bg-yellow-50"
                        : status === "Approved"
                        ? "text-green-500 bg-green-50"
                        : status === "Denied"
                        ? "text-red-500 bg-red-50"
                        : ""
                }`}
            >
                {status}
            </button>
            {button && (
                <div className="flex justify-between mt-2">
                    <button
                        onClick={onApprove}
                        className="w-full px-4 py-2 leading-5 font-bold text-green-700 transition-colors duration-200 transform bg-green-100 rounded focus:outline-none mr-2"
                    >
                        Approve
                    </button>
                    <button
                        onClick={onDeny}
                        className="w-full px-4 py-2 leading-5 font-bold text-red-700 transition-colors duration-200 transform bg-red-100 rounded focus:outline-none"
                    >
                        Deny
                    </button>
                </div>
            )}
        </Card>
    );
};

export default ItemCard;
