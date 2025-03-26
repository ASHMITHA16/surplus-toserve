import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NgoAuth({ onAuthSuccess }) {
    const [secretKey, setSecretKey] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5001/verify-ngo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("isNgoAuth", "true");
                onAuthSuccess(); // ✅ Update state in App.jsx
                navigate("/donors"); // ✅ Redirect to Donors Page
            } else {
                setError("Invalid Secret Key! Access Denied.");
            }
        } catch (error) {
            console.error("Error verifying NGO:", error);
            setError("Server error! Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Enter Secret Key</h2>
                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Enter Secret Key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                />
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
}

export default NgoAuth;
