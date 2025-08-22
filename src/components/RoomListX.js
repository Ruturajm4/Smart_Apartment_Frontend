// src/components/RoomList.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  const addRoom = async () => {
    if (!newRoom.name || !newRoom.description) return;
    await api.post("/rooms", newRoom);
    setNewRoom({ name: "", description: "" });
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
      />
      <button onClick={addRoom}>Add Room</button>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - {room.description}
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
