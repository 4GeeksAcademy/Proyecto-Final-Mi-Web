import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer bg-body-tertiary text-dark py-5 mt-5 shadow-sm">
	  <div className="container">
		<div className="row">
		  <div className="col-md-4 text-center text-md-start">
			<h5 className="fw-bold">Pooh & Tete</h5>
			<p className="small">
			  Belleza natural y cuidado de la piel con los mejores productos.
			</p>
		  </div>
		  <div className="col-md-4 text-center">
			<h5 className="fw-bold">Dirección y contacto</h5>
			<p className="small mb-1">
			  📍 Calle Llano de la Zaidía, 14, Valencia, España
			</p>
			<p className="small">
			  ✉ pooh&tete@gmail.com
			</p>
		  </div>
		  <div className="col-md-4 text-center text-md-end">
			<h5 className="fw-bold">Síguenos</h5>
			<div>
			  <a href="https://www.facebook.com/share/16JFje6hkF/" target="_blank" className="text-dark me-3"><i className="fab fa-facebook fa-lg"></i></a>
			  <a href="https://www.instagram.com/poohytete?igsh=OXhicDJ5Mm8yNmtt" target="_blank" className="text-dark me-3"><i className="fab fa-instagram fa-lg"></i></a>
			  <a href="https://wa.me/34636814457" target="_blank" className="text-dark"><i className="fab fa-whatsapp fa-lg"></i></a>
			</div>
		  </div>
		</div>
		<div className="text-center mt-4">
		  <h6 className="fw-bold">
			<Link to="/Información" className="text-dark text-decoration-none">Más información</Link>
		  </h6>
		</div>
		<hr className="my-4 border-dark" />
		<div className="text-center small">
		  &copy; 2025 Pooh & Tete. Todos los derechos reservados.
		</div>
	  </div>
	</footer>
);
