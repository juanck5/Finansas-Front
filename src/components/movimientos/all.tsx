"use client"
import apiClient from "@/servises/apiClient.services";
import { use, useEffect, useState } from "react";

export default function AllMovements() {
    const [movements, setMovements] = useState([]);

    useEffect(() => {
        fetchMovements();
    }, []);

    const fetchMovements = async () => {
        try {
            const response = await apiClient.get("/movimientos");
            setMovements(response.data);
        } catch (error) {
            console.error("Error al obtener los movimientos:", error);
        }
    };
    return (
        <div>
            <h1>AllMovements {movements.length}</h1>
        </div>
    );
}