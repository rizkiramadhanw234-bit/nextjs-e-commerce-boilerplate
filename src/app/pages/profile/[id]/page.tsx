"use client";

import { useAuthStore } from "@/stores/authStore";
import UserModal from "@/components/userModal";

export default function Profile() {
  const { user, loading } = useAuthStore();
  if (!user) return;

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {loading ? (
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col">
          <img src={user.image} alt={user.username} />
          <div>username: {user.username}</div>
          <div>email: {user.email}</div>
          <div>First Name: {user.firstName}</div>
          <div>Last Name: {user.lastName}</div>
          <div>Gender: {user.gender}</div>
          <div>Phone: {user.phone}</div>
          <div>{user.image}</div>
          <UserModal />
        </div>
      )}
    </div>
  );
}
