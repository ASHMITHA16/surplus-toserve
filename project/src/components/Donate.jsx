import { useState } from "react";
import axios from "axios";

const Donate = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        email: "",
        foodType: "",
        servings: "",
    });
    const [message, setMessage] = useState("");

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages
    
        try {
            const response = await axios.post("http://localhost:5001/donate", formData);
    
            if (response.data.success) {
                setMessage("✅ " + response.data.message);
                setFormData({
                    name: "",
                    contact: "",
                    address: "",
                    email: "",
                    foodType: "",
                    servings: ""
                });
            } else {
                setMessage("❌ " + response.data.message);
            }
        } catch (error) {
            console.error("Error submitting donation:", error);
            const errorMessage = error.response?.data?.message || "Failed to submit donation";
            setMessage("❌ " + errorMessage);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">Donate Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="foodType" placeholder="Food Type" value={formData.foodType} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="servings" placeholder="Number of Servings" value={formData.servings} onChange={handleChange} required className="w-full p-2 border rounded" />

                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Submit</button>
            </form>

            {message && <p className="text-center mt-4">{message}</p>}
        </div>
    );
};

export default Donate;
