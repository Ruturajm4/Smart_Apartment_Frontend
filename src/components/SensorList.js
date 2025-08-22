// src/components/SensorList.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const SensorList = () => {
  const { roomId } = useParams();
  const [sensors, setSensors] = useState([]);
  const [newSensor, setNewSensor] = useState({ type: "temperature", label: "" });

  useEffect(() => {
    fetchSensors();
  }, [roomId]);

  const fetchSensors = async () => {
    const res = await api.get(`/rooms/${roomId}/sensors`);
    setSensors(res.data);
  };

  const addSensor = async () => {
    if (!newSensor.label) return;
    await api.post("/sensors", { ...newSensor, room_id: roomId });
    setNewSensor({ type: "temperature", label: "" });
    fetchSensors();
  };

  const deleteSensor = async (id) => {
    await api.delete(`/sensors/${id}`);
    fetchSensors();
  };

  return (
    <div>
      <h2>Sensors for Room {roomId}</h2>
      <select
        value={newSensor.type}
        onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
      >
        <option value="temperature">Temperature</option>
        <option value="humidity">Humidity</option>
      </select>
      <input
        placeholder="Label"
        value={newSensor.label}
        onChange={(e) => setNewSensor({ ...newSensor, label: e.target.value })}
      />
      <button onClick={addSensor}>Add Sensor</button>

      <ul>
        {sensors.map((s) => (
          <li key={s.id}>
            {s.type} - {s.label}
            <button onClick={() => deleteSensor(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorList;
