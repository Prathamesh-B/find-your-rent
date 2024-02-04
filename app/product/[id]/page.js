"use client"

import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner/Spinner';
import { Carousel } from '@mantine/carousel';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Image, Paper, Text, Grid, Group, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BiSolidError } from 'react-icons/bi';

export default function Page({ params }) {
    const router = useRouter()
    const [opened, setOpened] = useState(false);
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`/api/item/getItem/${params.id}`);
                const json = await response.json();
                if (json.success) {
                    setItemData(json.item);
                } else {
                    showNotification({
                        id: 'not-found',
                        color: 'red',
                        autoClose: 5000,
                        icon: <BiSolidError />,
                        title: "Error",
                        message: 'Item not found!',
                        loading: false,
                    })
                    router.push("/");
                }
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [router, params.id]);

    const handleSendRequest = async (authToken, itemId) => {
        try {
            const response = await fetch('/api/item/rent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId, authToken })
            });
            const json = await response.json();
            if (json.success) {
                // Update the itemData state to mark it as not available
                setItemData(prevItemData => ({ ...prevItemData, isAvailable: false }));
                updateNotification({
                    id: 'rent',
                    color: 'green',
                    autoClose: 5000,
                    title: "Send",
                    message: 'Rent Request Send Successfully',
                    loading: false,
                });
            } else {
                updateNotification({
                    id: 'rent',
                    color: 'red',
                    autoClose: 5000,
                    icon: <BiSolidError />,
                    title: "Error",
                    message: json.message,
                    loading: false,
                });
            }
        } catch (error) {
            updateNotification({
                id: 'rent',
                color: 'red',
                autoClose: 5000,
                icon: <BiSolidError />,
                title: "Error while sending request",
                message: "Try again later",
                loading: false,
            });
            console.error('Error while sending request:', error);
        }
    };

    if (!itemData) {
        return <div className='pt-14'><Spinner /></div>;
    }

    const slides = itemData.photos.map((photo, index) => (
        <Carousel.Slide key={index}>
            <Image src={photo} alt={`Slide ${index + 1}`} />
        </Carousel.Slide>
    ));

    return (
        <div>
            <Modal centered opened={opened} onClose={() => setOpened(false)} title="Send Request">
                <p>You want to send a request to the owner?</p>
                <button
                    className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
                    onClick={() => {
                        handleSendRequest(localStorage.getItem('token'), itemData.id);
                        showNotification({
                            id: 'rent',
                            autoClose: false,
                            color: 'cyan',
                            title: "Sending",
                            message: 'Waiting for server',
                            loading: true,
                        });
                        setOpened(false);
                    }}
                >Send</button>
            </Modal>
            <div className="py-4" />
            <div className="mt-14 gap-5 relative z-0 max-w-6xl mx-auto">
                <Grid grow>
                    <Grid.Col span={6}>
                        <Group justify="center" align="flex-center">
                            <Carousel withIndicators loop className="w-auto max-w-md">
                                {slides}
                            </Carousel>
                        </Group>

                        <Grid.Col span={3}>
                            <Group justify="center" align="flex-start">
                                {itemData.photos.slice(0, 3).map((photo, index) => (
                                    <div key={index}>
                                        <Image src={photo} h={60} radius="md" alt={`Thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </Group>
                        </Grid.Col>

                        <Paper radius="xs" p="xl" my="md">
                            <Text justify="left" align="left" fw={600}>
                                {itemData.title}
                            </Text>
                            <Text size="sm" c="dimmed" mt="xs">
                                Description of the Item:
                            </Text>
                            <Text size="sm" c="dimmed" mb="xs">
                                {itemData.description}
                            </Text>
                            <Text justify="right" align="right" fw={600}>
                                Rs {itemData.price}/day
                            </Text>
                            {itemData.isAvailable ? (
                                <button
                                    onClick={() => setOpened(true)}
                                    className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
                                >
                                    Rent
                                </button>
                            ) : <button
                                className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-slate-700 rounded hover:bg-slate-600 focus:outline-none"
                            >
                                Not Available
                            </button>}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}
