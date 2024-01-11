"use client"
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner/Spinner';
import { Carousel } from '@mantine/carousel';
import { showNotification } from '@mantine/notifications';
import { Image, Paper, Text, Grid, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { BiSolidError } from 'react-icons/bi';

export default function Page({ params }) {
    const router = useRouter()
    const [shouldRunEffect, setShouldRunEffect] = useState(false);
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        if (!shouldRunEffect) {
            setShouldRunEffect(true);
            return;
        }

        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/item/getItem/${params.id}`);
                const json = await response.json();
                if(json.success){
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

        fetchItems();
    }, [router, params.id, shouldRunEffect]);

    if (!itemData) {
        return <div className='pt-14'><Spinner/></div>;
    }

    const slides = itemData.photos.map((photo, index) => (
        <Carousel.Slide key={index}>
            <Image src={photo} alt={`Slide ${index + 1}`} />
        </Carousel.Slide>
    ));

    return (
        <div>
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

                        <Paper shadow="xs" radius="xs" p="xl" my="md">
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
                            {itemData.isAvailable && (
                                <button
                                    className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </div>
        </div>
    );
}
