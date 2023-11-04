"use client"

import { Image, Paper, Text, Button, Grid, Group } from '@mantine/core';

const ProductPage = () => {
    return (<>
            <div className="py-4" />
        <div className='mt-14 flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto'>
            <Grid grow>
                <Grid.Col span={6}>
                    <Group justify="center" align="flex-start">
                        <Image
                            radius="md"
                            src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                            h={400}
                            p={10}
                            w="auto"
                            alt="Norway"
                        />
                    </Group>

                    <Grid.Col span={3}>
                        <Group justify="center" align="flex-start">
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={80}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={80}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                            <div>
                                <Image
                                    src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-the-books-clipart-vector-png-image_6653533.png"
                                    h={80}
                                    radius="md"
                                    alt="Norway"
                                />
                            </div>
                        </Group>
                    </Grid.Col>
                </Grid.Col>
                <Grid.Col span={6} >
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
                        <Button variant="filled" size="md" color="rgba(238, 147, 34, 1)">
                            Add to Cart
                        </Button>
                    </Paper>
                </Grid.Col>
            </Grid>
        </div>
    </>
    )
}

export default ProductPage