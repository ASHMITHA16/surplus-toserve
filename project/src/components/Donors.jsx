import { useState, useEffect } from 'react';
import axios from 'axios';
const Donors = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDonors, setSelectedDonors] = useState([]);
    const [notificationStatus, setNotificationStatus] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch donor details
    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get("http://localhost:5001/donors");
                setDonors(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching donors:", error);
                setLoading(false);
            }
        };
        fetchDonors();
    }, []);

    // Handle donor selection
    const handleDonorSelection = (donorId) => {
        setSelectedDonors(prev => {
            if (prev.includes(donorId)) {
                return prev.filter(id => id !== donorId);
            }
            return [...prev, donorId];
        });
    };

    // Send notifications to selected donors
    const notifySelectedDonors = async () => {
        try {
            if (selectedDonors.length === 0) {
                setNotificationStatus("Please select at least one donor");
                return;
            }
    
            setNotificationStatus("Sending notifications...");
    
            // Get full donor details for selected IDs
            const selectedDonorDetails = donors.filter(donor => 
                selectedDonors.includes(donor._id)
            );
    
            console.log('Sending donors:', selectedDonorDetails); // Debug log
    
            const response = await axios.post("http://localhost:5001/notify-donors", {
                donors: selectedDonorDetails
            });
    
            console.log('Response:', response.data); // Debug log
    
            if (response.data.success) {
                setDonors(prevDonors => 
                    prevDonors.filter(donor => !selectedDonors.includes(donor._id))
                );
                setNotificationStatus(`✅ ${response.data.message}`);
                setSelectedDonors([]); // Clear selections
            } else {
                setNotificationStatus(`⚠️ ${response.data.message}`);
            }
    
        } catch (error) {
            console.error("Error:", error);
            setNotificationStatus(`❌ Error: ${error.response?.data?.message || error.message}`);
        }
    };

    // Filter donors based on search
    const filteredDonors = donors.filter(donor => 
        donor.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Donors List</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by address..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {/* Notification Status */}
            {notificationStatus && (
                <div className={`p-3 mb-4 rounded ${
                    notificationStatus.includes("✅") 
                        ? "bg-green-100 text-green-700" 
                        : notificationStatus.includes("❌")
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                }`}>
                    {notificationStatus}
                </div>
            )}

            {loading ? (
                <p>Loading donors...</p>
            ) : filteredDonors.length > 0 ? (
                <>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedDonors(filteredDonors.map(d => d._id));
                                            } else {
                                                setSelectedDonors([]);
                                            }
                                        }}
                                        checked={selectedDonors.length === filteredDonors.length}
                                        className="h-4 w-4"
                                    />
                                </th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Contact</th>
                                <th className="border p-2">Food Type</th>
                                <th className="border p-2">Servings</th>
                                <th className="border p-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDonors.map((donor) => (
                                <tr key={donor._id}>
                                    <td className="border p-2 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedDonors.includes(donor._id)}
                                            onChange={() => handleDonorSelection(donor._id)}
                                            className="h-4 w-4"
                                        />
                                    </td>
                                    <td className="border p-2">{donor.name}</td>
                                    <td className="border p-2">{donor.contact}</td>
                                    <td className="border p-2">{donor.foodType}</td>
                                    <td className="border p-2">{donor.servings}</td>
                                    <td className="border p-2">{donor.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Notify Button */}
                    {selectedDonors.length > 0 && (
                        <button
                            onClick={notifySelectedDonors}
                            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Notify Selected Donors ({selectedDonors.length})
                        </button>
                    )}
                </>
            ) : (
                <p>No donors found.</p>
            )}
        </div>
    );
};

export default Donors;