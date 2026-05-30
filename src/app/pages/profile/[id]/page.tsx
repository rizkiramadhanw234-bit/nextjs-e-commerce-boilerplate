"use client";

import { useAuthStore } from "@/stores/authStore";
import UserModal from "@/components/userModal";

export default function Profile() {
  const { user, loading, error } = useAuthStore();

  if (!user) return <div>Not logged in</div>;
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p> Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <div>{error}</div>
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
    </div>
  );
}
