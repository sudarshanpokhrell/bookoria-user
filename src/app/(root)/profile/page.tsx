import OrderHistory from "@/components/OrderHistory";
import ProfileSection from "@/components/ProfileSection";
import React from "react";

function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <ProfileSection />
      <OrderHistory />
    </div>
  );
}

export default Profile;