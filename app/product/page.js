"use client"

import { images } from "."
import { Carousel } from '@mantine/carousel';
import { Image, Paper, Text, Grid, Group } from '@mantine/core';

const slides = images[0].url.map((item, index) => (
    <Carousel.Slide key={index}>
        <Image src={item.url} />
    </Carousel.Slide>
));

const ProductPage = () => {
    return (<>
        <div className="py-4" />
        <div className='mt-14 gap-5 relative z-0 max-w-6xl mx-auto'>
            <Grid grow >
                <Grid.Col span={6}>
                    <Group justify="center" align="flex-center">
                        <Carousel withIndicators loop className="w-auto max-w-md">
                            {slides}
                        </Carousel>
                    </Group>

                    <Grid.Col span={3}>
                        <Group justify="center" align="flex-start">
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={60}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={60}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={60}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                        </Group>
                    </Grid.Col>
                    <Paper shadow="xs" radius="xs" p="xl" my="md">
                        <Text justify="left" align="left" fw={600}>
                            Item_Name
                        </Text>
                        <Text size="sm" c="dimmed" mt="xs">
                            Description of the Item:
                        </Text>
                        <Text size="sm" c="dimmed" mb="xs">
                            Lorem ipsum dolor sit amet consectetur. A quis sagittis lacus adipiscing. Nunc vitae venenatis pharetra at tellus a nulla arcu nam. Ipsum in in id diam molestie lectus nunc lorem elit. Felis ac ut non odio quisque dictumst. Nulla tellus tellus nunc amet. Nibh amet nulla consequat mauris congue sed. Sit scelerisque turpis condimentum donec vitae cras pharetra. Velit pulvinar enim luctus integer ultrices nunc sit in felis. Aenean cras condimentum tincidunt neque mattis natoque tempor donec consectetur.
                        </Text>
                        <Text justify="right" align="right" fw={600}>
                            Rs 0.0/day
                        </Text>
                        <button className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none">Add to Cart</button>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    </>
    )
}

export default ProductPage