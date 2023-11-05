"use client"

import { Text, Image, SimpleGrid, Input } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';


const ItemAdd = () => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push("/login");
        }
    })
    const [files, setFiles] = useState([]);
    const [credentials, setCredentials] = useState({ title: "", description: "", price: 0 })
    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image key={index} alt="Item Image" src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    const handleSubmit = async (e, token) => {
        e.preventDefault();
        const photo = [];
        files.map((file) => {
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
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-700">Add Item</h2>
                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600">Upload your item&apos;s info here</h3>
                    <form onSubmit={(e) => {
                        const token = localStorage.getItem('token')
                        handleSubmit(e, token);
                        showNotification({
                            id: 'signin',
                            autoClose: false,
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
                        <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none" type="submit">Upload</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ItemAdd