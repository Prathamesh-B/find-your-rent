"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal, Textarea, Input } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import InfiniteScroll from "react-infinite-scroll-component";
import ItemCard from "../components/ItemCard/UserItemCard";
import { BiSolidError, BiSolidPencil } from "react-icons/bi";
import { MdFileDownloadDone } from "react-icons/md";
import Spinner from "../components/Spinner/Spinner";
import { useRouter } from "next/navigation";

const UserItems = () => {
    const [opened, setOpened] = useState(false);
    const [modal, setModal] = useState({ id: -1, title: "", description: "", price: 0 });
    const [items, setItems] = useState([]);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [skip, setSkip] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [shouldRunEffect, setShouldRunEffect] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push("/");
        }
        if (!shouldRunEffect) {
            setShouldRunEffect(true);
            return;
        }
        const fetchItems = async () => {
            const response = await fetch(`/api/item/userItems/${skip}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ authToken: token })
            });
            const json = await response.json();
            if (json.success) {
                setItems((oldItems) => [...oldItems, ...json.result]);
                if (json.result.length < 8) {
                    setHasMoreData(false); // No more data to fetch
                }
            }
        };
        fetchItems();
    }, [skip, shouldRunEffect, router]);

    const loadMore = () => {
        setSkip((oldSkip) => oldSkip + 1);
    };

    const handleOpenModal = (itemId, itemTitle, itemDescription, itemPrice) => {
        setModal({ ...modal, id: itemId, title: itemTitle, description: itemDescription, price: itemPrice });
        setOpened(true);
    };

    const handleDeleteItem = (itemId) => {
        setDeleteItemId(itemId);
        setDeleteConfirmationModal(true);
    };

    const handleConfirmDelete = () => {
        const token = localStorage.getItem('token');
        handleDelete(token, deleteItemId);
        setDeleteConfirmationModal(false);
    };

    const handleDelete = async (authToken, id) => {
        const response = await fetch('/api/item/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, authToken })
        });
        const json = await response.json();
        if (json.success) {
            // Remove the item from the local items array
            setItems(items.filter((item) => item.id !== id));
            updateNotification({
                id: 'delete',
                color: 'green',
                autoClose: 5000,
                icon: <MdFileDownloadDone />,
                title: "Delete",
                message: 'Item deleted Successfully',
                loading: false,
            });
        } else {
            updateNotification({
                id: 'delete',
                color: 'red',
                autoClose: 5000,
                icon: <BiSolidError />,
                title: "Error",
                message: 'Server error',
                loading: false,
            });
        }
    };

    const handleUpdate = async (id, title, description, price, authToken) => {
        const response = await fetch('/api/item/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, title, description, price, authToken })
        });
        const json = await response.json();
        if (json.success) {
            //update only the modified item in the items
            const updatedItemIndex = items.findIndex((item) => item.id === id);
            items[updatedItemIndex] = { ...items[updatedItemIndex], title, description, price };
            setItems([...items]);
            updateNotification({
                id: 'update',
                color: 'green',
                autoClose: 5000,
                icon: <BiSolidPencil />,
                title: "Update",
                message: 'Item updated Successfully',
                loading: false,
            });

        } else {
            updateNotification({
                id: 'update',
                color: 'red',
                autoClose: 5000,
                icon: <BiSolidError />,
                title: "Error",
                message: 'Server error',
                loading: false,
            });
        }
        setOpened(false);
    };

    return (
        <div className="pt-8 padding-x">
            <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
                My Items:
            </p>
            <Modal centered opened={opened} onClose={() => { setOpened(false) }} title="Edit">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let token = localStorage.getItem('token');
                    handleUpdate(modal.id, modal.title, modal.description, modal.price, token);
                    showNotification({
                        id: 'update',
                        autoClose: false,
                        color: 'cyan',
                        title: "Updating Item",
                        message: 'Waiting for server',
                        loading: true,
                    });
                }}>
                    <div className="w-full mt-4">
                        <Input
                            value={modal.title}
                            variant="default"
                            name="title"
                            placeholder="Title"
                            required
                            onChange={(e) => setModal({ "id": modal.id, "title": e.target.value, "description": modal.description, "price": modal.price })}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Textarea
                            value={modal.description}
                            autosize
                            maxRows={6}
                            variant="default"
                            name="description"
                            placeholder="Description"
                            required
                            onChange={(e) => setModal({ "id": modal.id, "title": modal.title, "description": e.target.value, "price": modal.price })}
                        />
                    </div>
                    <div className="w-full mt-4">
                        <Input
                            value={modal.price}
                            variant="default"
                            name="price"
                            type="number"
                            placeholder="Price"
                            required
                            onChange={(e) => setModal({ "id": modal.id, "title": modal.title, "description": modal.description, "price": e.target.value })}
                        />
                    </div>
                    <button className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none" type="submit">
                        Done
                    </button>
                </form>
            </Modal>
            <Modal centered opened={deleteConfirmationModal} onClose={() => setDeleteConfirmationModal(false)} title="Confirm Delete">
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                <button
                    className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => {
                        handleConfirmDelete();
                        showNotification({
                            id: 'delete',
                            autoClose: false,
                            color: 'cyan',
                            title: "Deleting Item",
                            message: 'Waiting for server',
                            loading: true,
                        });
                    }}
                >
                    Confirm Delete
                </button>
            </Modal>
            <InfiniteScroll
                dataLength={items.length}
                next={loadMore}
                hasMore={hasMoreData}
                loader={<Spinner />}
            >
                {items.length === 0 ? (
                    <p className="text-center mt-4">You have no items yet.</p>
                ) : (
                    <>
                        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
                            {items?.map((item) => (
                                <div className="col-md-4" key={uuidv4()}>
                                    <ItemCard
                                        onOpenModal={() => handleOpenModal(item.id, item.title, item.description, item.price)}
                                        onDeleteItem={() => { handleDeleteItem(item.id) }}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        description={item.description}
                                        photos={item.photos[0]}
                                    />
                                </div>
                            ))}
                        </div>
                    </>)}
            </InfiniteScroll>
        </div>
    );
};

export default UserItems;
