// src/components/RoomList.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: "", description: "" });
  const [selectedRoom, setSelectedRoom] = useState(""); // for dropdown
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const addRoom = async () => {
    if (!newRoom.name || !newRoom.description) return;
    try {
      await api.post("/rooms", newRoom);
      setNewRoom({ name: "", description: "" });
      fetchRooms();
    } catch (err) {
      console.error("Error adding room:", err);
    }
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      fetchRooms();
      if (selectedRoom === id) setSelectedRoom(""); // reset dropdown if deleted
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  const handleManageSensors = () => {
    if (selectedRoom) {
      navigate(`/rooms/${selectedRoom}/sensors`);
    }
  };

  return (
    <div>
      <h2>Rooms</h2>
      {/* Add Room */}
      <input
        placeholder="Name"
        value={newRoom.name}
        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
        
      />
      <input
        placeholder="Description"
        value={newRoom.description}
        onChange={(e) =>
          setNewRoom({ ...newRoom, description: e.target.value })
        }
        style={{ marginLeft: "10px" }}
      />
      <button onClick={addRoom} style={{ marginLeft: "10px" }}>Add Room</button>

      {/* Dropdown */}
      <div style={{ marginTop: "20px" }}>
        <label>Select Room: </label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          <option value="">-- Select a Room --</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} - {room.description}
            </option>
          ))}
        </select>
        <button
          onClick={handleManageSensors}
          disabled={!selectedRoom}
          style={{ marginLeft: "10px" }}x
        >
          Manage Sensors
        </button>
        {selectedRoom && (
          <button
            onClick={() => deleteRoom(selectedRoom)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete Room
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomList;
