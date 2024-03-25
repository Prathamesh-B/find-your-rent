"use client";

import React, { useEffect, useState } from 'react';
import { Modal } from "@mantine/core";
import Spinner from "../components/Spinner/Spinner";
import { showNotification, updateNotification } from '@mantine/notifications';
import { LuCheck, LuBan } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import ItemCard from '../components/ItemCard/RentPageItemCard';

const fetchRentRequests = async (token, method) => {
  const response = await fetch('/api/item/rentRequests', {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ authToken: token }),
  });
  const json = await response.json();
  return json.success ? json.rentals : [];
};

const UserRents = () => {
  const [myItems, setMyItems] = useState([]);
  const [incomingItems, setIncomingItems] = useState([]);
  const [myRequestLoading, setMyRequestLoading] = useState(true);
  const [incomingLoading, setIncomingLoading] = useState(true);
  const [approveModal, setApproveModal] = useState(false)
  const [itemState, setItemState] = useState({})
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push("/");
    }
    const fetchRequests = async () => {
      const myItems = await fetchRentRequests(token, 'PUT');
      const incomingItems = await fetchRentRequests(token, 'POST');
      setMyItems(myItems);
      setMyRequestLoading(false);
      setIncomingItems(incomingItems);
      setIncomingLoading(false);
    };
    fetchRequests();
  }, [router]);

  const handleApprove = async (rentId, rentalId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/item/rent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentId, rentalId, authToken: token }),
      });

      const json = await response.json();
      if (json.success) {
        // Update the status of the approved item in incomingItems
        const updatedIncomingItems = incomingItems.map(item => {
          if (item.id === rentId) {
            return { ...item, status: 'Approved' };
          }
          return item;
        });

        // Set the updated state
        setIncomingItems(updatedIncomingItems);

        updateNotification({
          id: 'request',
          color: 'green',
          autoClose: 5000,
          icon: <LuCheck />,
          title: "Success",
          message: 'Request Approved Successfully',
          loading: false,
        });
      } else {
        updateNotification({
          id: 'request',
          color: 'red',
          autoClose: 5000,
          icon: <LuBan />,
          title: "Error",
          message: json.message,
          loading: false,
        });
      }
    } catch (error) {
      updateNotification({
        id: 'request',
        color: 'red',
        autoClose: 5000,
        icon: <LuBan />,
        title: "Error while approving rental",
        message: "Try again later",
        loading: false,
      });
      console.error('Error while approving rental:', error);
    }
  };

  const handleDeny = async (rentId, rentalId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/item/rent', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentId, rentalId, authToken: token }),
      });

      const json = await response.json();
      if (json.success) {
        // Update the status of the denied item in incomingItems
        const updatedIncomingItems = incomingItems.map(item => {
          if (item.id === rentId) {
            return { ...item, status: 'Denied' };
          }
          return item;
        });

        // Set the updated state
        setIncomingItems(updatedIncomingItems);

        updateNotification({
          id: 'request',
          color: 'green',
          autoClose: 5000,
          icon: <LuCheck />,
          title: "Success",
          message: 'Request Denied Successfully',
          loading: false,
        });
      } else {
        updateNotification({
          id: 'request',
          color: 'red',
          autoClose: 5000,
          icon: <LuBan />,
          title: "Error",
          message: json.message,
          loading: false,
        });
      }
    } catch (error) {
      updateNotification({
        id: 'request',
        color: 'red',
        autoClose: 5000,
        icon: <LuBan />,
        title: "Error while approving rental",
        message: "Try again later",
        loading: false,
      });
      console.error('Error while approving rental:', error);
    }
  };

  const handleCancel = async (rentId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/item/cancelRentRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rentId, authToken: token }),
      });

      const json = await response.json();
      if (json.success) {
        const updatedMyItems = myItems.filter(item => item.id !== rentId);
        // Set the updated state
        setMyItems(updatedMyItems);

        updateNotification({
          id: 'request',
          color: 'green',
          autoClose: 5000,
          icon: <LuCheck />,
          title: "Success",
          message: 'Request Cancelled Successfully',
          loading: false,
        });
      } else {
        updateNotification({
          id: 'request',
          color: 'red',
          autoClose: 5000,
          icon: <LuBan />,
          title: "Error",
          message: json.message,
          loading: false,
        });
      }
    } catch (error) {
      updateNotification({
        id: 'request',
        color: 'red',
        autoClose: 5000,
        icon: <LuBan />,
        title: "Error while cancelling request",
        message: "Try again later",
        loading: false,
      });
      console.error('Error while cancelling request:', error);
    }
  };

  return (
    <div className="pt-8 padding-x">
      <Modal centered opened={approveModal} onClose={() => setApproveModal(false)} title="Renter details">
        <p className='text-lg'>Name: {itemState?.renter?.username}</p>
        <p className='text-lg'>You can contact the renter on the following email: {itemState?.renter?.email}</p>
        <button
          className="mt-4 w-full px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none"
          onClick={() => {
            handleApprove(itemState.id, itemState.renterId);
            showNotification({
              id: 'request',
              autoClose: false,
              color: 'cyan',
              title: "Loading",
              message: 'Waiting for server',
              loading: true,
            });
            setApproveModal(false);
          }}
        >
          Approve
        </button>
      </Modal>
      <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
        My Rent Requests:
      </p>
      {myItems.length === 0 ? (
        <>
          <p className="text-center mt-4">Feel free to explore and request items for rent.</p>
          {myRequestLoading && <Spinner />}
        </>
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
          {myItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <ItemCard item={item.item} status={item.status} button={false} onCancel={handleCancel} rentId={item.id} />
            </div>
          ))}
        </div>
      )}

      <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
        Incoming Rent Requests:
      </p>
      {incomingItems.length === 0 ? (
        <>
          <p className="text-center mt-4">No one is currently requesting to rent your items.</p>
          {incomingLoading && <Spinner />}
        </>
      ) : (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
          {incomingItems.map((item) => (
            <div key={item.id} className="col-md-4">
              <ItemCard
                item={item.item}
                status={item.status}
                button={true}
                onApprove={() => {
                  setItemState(item);
                  setApproveModal(true);
                }}
                onDeny={() => {
                  handleDeny(item.id, item.renterId);
                  showNotification({
                    id: 'request',
                    autoClose: false,
                    color: 'cyan',
                    title: "Loading",
                    message: 'Waiting for server',
                    loading: true,
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRents;
