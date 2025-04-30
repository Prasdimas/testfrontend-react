import { useEffect, useState } from "react";
import { fetchProfile, logoutUser } from "../utils/Api";

type UserProfile = {
  first_name: string;
  last_name: string;
  gender: string;
  phone: string;
  email: string;
};

export default function Profile({ onLogout }: { onLogout: () => void }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchProfile();
        // console.log("Profile response:", res.data.data);
        setProfile(res.data.data);
      } catch (e) {
        console.error("Error fetching profile:", e);
        alert("Unauthorized");
        onLogout();
      }
    };

    loadProfile();
  }, [onLogout]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
        alert('Success Logout')
      sessionStorage.removeItem("token");
      onLogout();
    }
  };

  return (
    <div className="profile">
    <div className="profile-header">
      <div className="profile-avatar">
        <span>{profile?.first_name?.[0]}</span>
      </div>
      <h2>Welcome, {profile?.first_name || "User"}</h2>
    </div>
    <div className="profile-info">
      <p><strong>Name:</strong> {profile?.first_name} {profile?.last_name}</p>
      <p>
  <strong>Gender:</strong>{" "}
  {profile?.gender === "M"
    ? "Male"
    : profile?.gender === "F"
    ? "Female"
    : "Unknown"}
</p>

      <p><strong>Email:</strong> {profile?.email}</p>
      <p><strong>Phone:</strong> {profile?.phone}</p>
    </div>
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>
  );
}
