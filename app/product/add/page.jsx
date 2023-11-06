"use client"
import { Text, Textarea, Image, SimpleGrid, Input } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { showNotification, updateNotification, cleanNotifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { BsUpload, BsFileImage } from "react-icons/bs";
import { BiSolidError } from "react-icons/bi";


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
        if(files.length === 0){
            cleanNotifications()
            showNotification({
                id: 'img',
                color: 'gray',
                autoClose: 5000,
                icon: <BsFileImage />,
                title: "Add Image",
                message: 'Image is missing',
                loading: false,
            })
            return 0;
        }
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
                id: 'add',
                color: 'green',
                autoClose: 5000,
                icon: <BsUpload />,
                title: "Successful",
                message: 'Item added Successfully',
                loading: false,
            })
        }
        else {
            updateNotification({
                id: 'add',
                color: 'red',
                autoClose: 5000,
                icon: <BiSolidError />,
                title: "Error",
                message: 'Not Allowed',
                loading: false,
            })
        }
        setFiles([])
        e.target.reset();
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
                <h2 className="text-3xl font-bold text-center text-gray-700">Add Item</h2>
                <h3 className="mt-1 text-xl font-medium text-center text-gray-600">Upload your item&apos;s info here</h3>
                <form onSubmit={(e) => {
                    const token = localStorage.getItem('token')
                    showNotification({
                        id: 'add',
                        autoClose: false,
                        color: 'cyan',
                        title: "Loding",
                        message: 'Waiting for server',
                        loading: true,
                    })
                    handleSubmit(e, token);
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
                        <Textarea
                            autosize
                            maxRows={6}
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
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            onDrop={setFiles}
                        >
                            <Text ta="center">Drag images here or click to select files</Text>
                            <Text size="xs" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </Dropzone>
                        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
                            {previews}
                        </SimpleGrid>
                    </div>
                    <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none" type="submit">Add</button>
                </form >
            </div >
        </>
    )
}

export default ItemAdd