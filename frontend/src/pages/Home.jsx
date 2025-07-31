import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import heroImg from '../assets/hero.png';

/**
 * Página de inicio que presenta la aplicación PDFLEGAL. Muestra un héroe con
 * descripción de la plataforma y llamadas a la acción para registrarse o
 * iniciar sesión.
 */
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Genera documentos legales fácilmente
            </h1>
            <p className="mb-6 text-lg text-gray-700">
              Crea contratos, cartas, poderes y más mediante formularios sencillos, sin necesidad de conocimientos jurídicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="inline-block text-center px-6 py-3 rounded-md bg-indigo-600 text-white font-medium shadow hover:bg-indigo-500 transition"
              >
                Comenzar
              </Link>
              <Link
                to="/login"
                className="inline-block text-center px-6 py-3 rounded-md bg-gray-200 text-gray-800 font-medium shadow hover:bg-gray-300 transition"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={heroImg}
              alt="Ilustración documentos legales"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
