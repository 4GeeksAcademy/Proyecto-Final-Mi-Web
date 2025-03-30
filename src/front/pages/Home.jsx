import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import perfumes from "../assets/img/perfumes.jpg";
import maquillaje from "../assets/img/maquillaje.jpg";
import cosmética from "../assets/img/cosmética.jpg";
import cabello from "../assets/img/cabello.jpg";
import higiene from "../assets/img/higiene.jpg";
import salud from "../assets/img/salud.jpg";
import regalos from "../assets/img/regalos.jpg";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const Login = async () => {
		const response = await fetch("https://fluffy-telegram-x5qpxwxp49jf96jj-3001.app.github.dev/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ "email": "alex@alex.com", "password": "1234" })
		});
		const data = await response.json();
		console.log(data.token);
		dispatch({ type: "save_token", token: data.token });
	};

	return (
		<div
			id="carouselExampleAutoplaying"
			className="carousel slide carousel-fade py-3"
			data-bs-ride="carousel"
			style={{ maxWidth: "80vw", margin: "auto" }} // Ancho del 80% de la pantalla y centrado
		>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src={perfumes} className="d-block w-100 img-fluid" alt="Perfumes" />
				</div>
				<div className="carousel-item">
					<img src={maquillaje} className="d-block w-100 img-fluid" alt="Maquillaje" />
				</div>
				<div className="carousel-item">
					<img src={cosmética} className="d-block w-100 img-fluid" alt="Cosmética" />
				</div>
				<div className="carousel-item">
					<img src={cabello} className="d-block w-100 img-fluid" alt="Cabello" />
				</div>
				<div className="carousel-item">
					<img src={higiene} className="d-block w-100 img-fluid" alt="Higiene" />
				</div>
				<div className="carousel-item">
					<img src={salud} className="d-block w-100 img-fluid" alt="Salud" />
				</div>
				<div className="carousel-item">
					<img src={regalos} className="d-block w-100 img-fluid" alt="Regalos" />
				</div>
			</div>
			<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>

			{/* Estilos responsivos con altura aumentada */}
			<style>
				{`
					@media (min-width: 768px) {
						.carousel-inner img {
							height: 600px; /* Altura aumentada */
							object-fit: cover;
						}
					}

					@media (max-width: 767px) {
						.carousel-inner img {
							height: 400px; /* Altura ajustada para móviles */
							object-fit: cover;
						}
					}
				`}
			</style>
		</div>
	);
};
