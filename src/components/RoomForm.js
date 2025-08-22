// src/components/RoomList.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");

  // Fetch rooms
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  const addRoom = async () => {
    if (!name) return;
    await api.post("/rooms", { name });
    setName("");
    fetchRooms();
  };

  const deleteRoom = async (id) => {
    await api.delete(`/rooms/${id}`);
    fetchRooms();
  };

  return (
    <div>
      <h2>Rooms</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter room name"
      />
      <button onClick={addRoom}>Add Room</button>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name}{" "}
            <button onClick={() => deleteRoom(room.id)}>Delete</button>
            <Link to={`/rooms/${room.id}/sensors`}>
              <button>Manage Sensors</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
