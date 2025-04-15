import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Perfumes } from "./pages/Perfumes";
import { Maquillaje } from "./pages/Maquillaje";
import { Cosmética } from "./pages/Cosmética";
import { Cabello } from "./pages/Cabello";
import { Higiene } from "./pages/Higiene";
import { Salud } from "./pages/Salud";
import { Regalos } from "./pages/Regalos";
import { Información } from "./pages/Información";
import PrivateRoute from './pages/PrivateRoute';
import { MiCuenta } from './pages/MiCuenta';
import { Carrito } from "./pages/Carrito";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfumes" element={<Perfumes />} />
      <Route path="/maquillaje" element={<Maquillaje />} />
      <Route path="/cosmética" element={<Cosmética />} />
      <Route path="/cabello" element={<Cabello />} />
      <Route path="/higiene" element={<Higiene />} />
      <Route path="/salud" element={<Salud />} />
      <Route path="/regalos" element={<Regalos />} />
      <Route path="/información" element={<Información />} />
      {/* Ruta privada protegida */}
      <Route path="/mi-cuenta" element={<PrivateRoute><MiCuenta /></PrivateRoute>} />
      <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
    </Route>
  )
);
