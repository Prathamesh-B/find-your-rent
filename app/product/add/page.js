"use client"

import { Text, Image, SimpleGrid, Input, Button } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';


const ItemAdd = () => {
    const supabaseUrl = "https://lnskelhtnpghxaugopjz.supabase.co"
    const supabaseKey = process.env.SUPABASE_API_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    const [files, setFiles] = useState([]);
    const [credentials, setCredentials] = useState({ title: "", description: "", price: 0 })
    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    const handleSubmit = async (e, token) => {
        e.preventDefault();
        const photo = [];
        files.map((file, index) => {
            let name = uuidv4()
            uploadImage(name, file)
            const { data } = supabase.storage.from('image').getPublicUrl(`${name}`)
            photo.push((data.publicUrl));
        });
        const response = await fetch('/api/item/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: credentials.title, description: credentials.description, price: credentials.price, photos: photo, authToken: token })
        });
        const json = await response.json()

        if (json.success) {
            // Save the auth token and redirect
            updateNotification({
                id: 'signin',
                color: 'green',
                autoClose: 5000,
                // icon: <FaSignInAlt />,
                title: "Logging",
                message: 'Logged in Successfully',
                loading: false,
            })
        }
        else {
            updateNotification({
                id: 'signin',
                color: 'red',
                autoClose: 5000,
                // icon: <MdOutlineClose />,
                title: "Error",
                message: 'Invalid credentials',
                loading: false,
            })
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    async function uploadImage(name, file) {
        try {
            // 'public' is the storage bucket name. You can change it if needed.
            const { data, error } = await supabase.storage
                .from('image') // specify the storage bucket
                .upload(name, file);
            if (error) {
                // add notifications here
                console.error('Error uploading image:', error);
            } else {
                console.log('Image uploaded:', data);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    return (
        <>
            <div className="py-4" />
            <div className="mt-14 p-4 w-auto max-w-sm mx-auto overflow-hidden bg-white border rounded-lg">
                <form onSubmit={(e) => {
                    const token = localStorage.getItem('token')
                    handleSubmit(e, token);
                    showNotification({
                        id: 'signin',
                        autoClose: false,
                        disallowClose: true,
                        color: 'cyan',
                        title: "Loding",
                        message: 'Waiting for server',
                        loading: true,
                    })
                }} >
                    <div className="w-full mt-4">
                        <Input
                            variant="default"
                            name="title"
                            placeholder="Title"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Input
                            variant="default"
                            name="description"
                            placeholder="Description"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Input
                            variant="default"
                            name="price"
                            type="number"
                            placeholder="Price"
                            required
                            onChange={onChange}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Dropzone
                            accept={IMAGE_MIME_TYPE}
                            onDrop={
                                setFiles
                            }
                        >
                            <Text ta="center">Drop images here</Text>
                        </Dropzone>
                        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                            {previews}
                        </SimpleGrid>
                    </div>

                    <Button mt="md" fz="md" fullWidth color="rgba(238, 147, 34, 1)" type='submit'>Upload</Button>
                </form>
            </div>
        </>
    )
}

export default ItemAdd