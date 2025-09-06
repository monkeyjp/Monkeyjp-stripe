import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate()

	const carrito = [
		{
			id: 52,
			name: "Origins",
			artist: "imagine dragons",
			quantity: 2,
			price: 20
		},
		{
			id: 80,
			name: "Californication",
			artist: "RHCP",
			quantity: 1,
			price: 20
		},
		{
			id: 10,
			name: "face the heat",
			artist: "Scorpions",
			quantity: 1,
			price: 30
		},
	]

	const totalCarrito = () => {
		//						acum, element => acumladAnterior + precio Element * cantidad Elemento, valor inicial del Acumulador
		return carrito.reduce((total, item) => total + item.price * item.quantity, 0)

	}

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}


	const totalAmount = 1500; // Aquí calcularías el total real
	const currency = "eur";

	const handleCheckout = () => {
		navigate(`/checkout/${totalCarrito()}/${currency}`)
	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Stripe </h1>
			
			
			<p>Total: {totalCarrito()} {currency.toUpperCase()}</p>
			<button onClick={handleCheckout}>Comprar</button>
		</div>
	);
}; 