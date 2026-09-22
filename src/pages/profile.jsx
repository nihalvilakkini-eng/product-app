import { useEffect, useState } from "react";
import api from "../Api";

function Profile() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        profileImage: null,
    });

    // Get logged-in user's profile
    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {

        try {

            const response = await api.get("/api/auth/profile");

            console.log("Profile:", response.data);

            const user = response.data.data;

            setProfile(user);

            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || "",
                profileImage: null,
            });

        } catch (error) {

            console.error("Profile error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const data = new FormData();

            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("phone", formData.phone);

            if (formData.profileImage) {
                data.append(
                    "profileImage",
                    formData.profileImage
                );
            }

            const response = await api.put(
                "/api/auth/updateprofile",
                data
            );

            console.log("Updated profile:", response.data);

            alert("Profile updated successfully");

            setProfile(response.data.data);

            setEditMode(false);

        } catch (error) {

            console.error("Update profile error:", error);

            alert(
                error.response?.data?.message ||
                "Profile update failed"
            );

        }

    };

    if (loading) {
        return (
            <div className="container mt-4">
                <h3>Loading profile...</h3>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mt-4">
                <h3>Profile not found</h3>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="mb-4"  style={{ textAlign: "center" }}>
                    My Profile
                </h2>

                {/* Profile Image */}
                <div className="mb-4 text-center">

                    {profile.profileImage ? (

                       <img
                            src={`http://localhost:8000/${(profile.profileImage || "").replace(/\\/g, "/")}`}
                            alt="Profile"
                            width="120"
                            height="120"
                            style={{
                              objectFit: "cover",
                              borderRadius: "50%"
                            }}
                          />

                    ) : (

                        <div>
                            No profile image
                        </div>

                    )}

                </div>

                {!editMode ? (

                    <>
                        <h5>
                            Name: {profile.firstName} {profile.lastName}
                        </h5>

                        <p>
                            <strong>Email:</strong>{" "}
                            {profile.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {profile.phone}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {profile.role}
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => setEditMode(true)}
                        >
                            Edit Profile
                        </button>
                    </>

                ) : (

                    <form onSubmit={handleUpdate}>

                        {/* First Name */}
                        <div className="mb-3">

                            <label className="form-label">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                className="form-control"
                                value={formData.firstName}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Last Name */}
                        <div className="mb-3">

                            <label className="form-label">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                className="form-control"
                                value={formData.lastName}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Email */}
                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={profile.email}
                                disabled
                            />

                        </div>

                        {/* Phone */}
                        <div className="mb-3">

                            <label className="form-label">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        {/* Profile Image */}
                        <div className="mb-3">

                            <label className="form-label">
                                Profile Image
                            </label>

                            <input
                                type="file"
                                name="profileImage"
                                className="form-control"
                                accept="image/*"
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-success me-2"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>

                    </form>

                )}

            </div>

        </div>
    );
}

export default Profile;