import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import JSConfetti from 'js-confetti'

export const Register = () => {
  const [mensaje, setMensaje] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .matches(/^[A-Za-zñÑ\s]+$/, 'El nombre solo puede contener letras mayúsculas, minúsculas')
      .required('El nombre es obligatorio'),
    apellido: Yup.string()
      .matches(/^[A-Za-zñÑ\s]+$/, 'El apellido solo puede contener letras mayúsculas, minúsculas ')
      .required('El apellido es obligatorio'),
    direccion: Yup.string().required('La dirección es obligatoria'),
    telefono: Yup.string()
      .matches(/^\d{10}$/, 'Solo puede contener numeros, exactamente 10 dígitos')
      .required('El teléfono es obligatorio'),
    email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
        const respuesta = await axios.post(url, values);
        setMensaje({ respuesta: respuesta.data.msg, tipo: true });
        setShowConfetti(true); // Activar el confeti después de enviar el formulario con éxito
        formik.resetForm();
      } catch (error) {
        setMensaje({ respuesta: error.response.data.msg, tipo: false });
      }
    },
  });

  useEffect(() => {
    if (showConfetti) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({ emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'] });
    }
  }, [showConfetti]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Elimina los espacios en blanco al principio y al final del valor
    const trimmedValue = value.trim();
    formik.setFieldValue(name, trimmedValue);
  };

  return (
    <>
      <div className="bg-white flex justify-center items-center w-1/2">
        <div className="md:w-4/5 sm:w-full">
          {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Bienvenido</h1>
          <small className="text-gray-400 block my-4 text-sm">Por favor ingrese los siguientes datos</small>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name"
                className={`block w-full rounded-md border ${formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 text-sm">{formik.errors.nombre}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formik.values.apellido}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your lastname"
                className={`block w-full rounded-md border ${formik.touched.apellido && formik.errors.apellido ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
              />
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="text-red-500 text-sm">{formik.errors.apellido}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your address"
                className={`block w-full rounded-md border ${formik.touched.direccion && formik.errors.direccion ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
              />
              {formik.touched.direccion && formik.errors.direccion && (
                <div className="text-red-500 text-sm">{formik.errors.direccion}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold" htmlFor="telefono">Telefono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Ingresa tu teléfono"
                className={`block w-full rounded-md border ${formik.touched.telefono && formik.errors.telefono ? 'border-red-500' : 'border-gray-300'} focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                required
              />
              {formik.touched.telefono && formik.errors.telefono && (
                <div className="text-red-500 text-sm">{formik.errors.telefono}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your email"
                className={`block w-full rounded-md border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="********************"
                className={`block w-full rounded-md border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500`}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
              >
                Registrar
              </button>
            </div>
          </form>
          <div className="mt-5 text-xs border-b-2 py-4"></div>
          <div className="mt-3 text-sm flex justify-between items-center">
            <p>¿Ya tienes una cuenta?</p>
            <Link
              to="/login"
              className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div
        className="w-1/2 h-screen bg-[url('/public/images/dogregister.jpg')] bg-no-repeat bg-cover bg-center sm:block hidden"
      ></div>
    </>
  );
};
