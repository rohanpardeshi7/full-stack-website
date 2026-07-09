import React, { useState } from "react";

const AddMaterial = () => {
  const [materialName, setMaterialName] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materialName.trim() || !order) {
      setMessage("⚠️ Please fill all fields.");
      return;
    }

    const newMaterial = {
      name: materialName,
      order: Number(order),
    };

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/materials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMaterial),
      });

      if (!res.ok) {
        throw new Error("Failed to add material");
      }

      const data = await res.json();
      setMessage(`✅ Material "${data.name}" added successfully!`);

      // Reset form
      setMaterialName("");
      setOrder("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error adding material. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="bg-gray-100 px-4 py-2 rounded-t">
        <h2 className="text-lg font-bold">Add Material</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Material Name</label>
          <input
            type="text"
            placeholder="Material Name"
            value={materialName}
            onChange={(e) => setMaterialName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Order</label>
          <input
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {message && <p className="text-sm">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Material"}
        </button>
      </form>
    </div>
  );
};

export default AddMaterial;
