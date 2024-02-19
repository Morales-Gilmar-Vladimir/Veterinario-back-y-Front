import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider"
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { useFormik } from "formik";
import * as Yup from "yup";


export const Formulario = ({ paciente }) => {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})

    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Solo se permiten letras mayúsculas y minúsculas')
            .required("El nombre es obligatorio"),
        propietario: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Solo se permiten letras mayúsculas y minúsculas')
            .required("El nombre del propietario es obligatorio"),
        email: Yup.string()
            .email("Email no válido")
            .required("El email es obligatorio"),
        celular: Yup.string()
            .matches(/^\d{10}$/, 'Debe contener exactamente 10 dígitos')
            .required("El número de celular es obligatorio"),
        convencional: Yup.string()
            .matches(/^\d{7}$/, 'Debe contener exactamente 7 dígitos')
            .required("El número convencional es obligatorio"),
        salida: Yup.date().required("La fecha de salida es obligatoria"),
        sintomas: Yup.string().required("Los síntomas son obligatorios"),
    });


    const initialValues = {
        nombre: paciente?.nombre ?? "",
        propietario: paciente?.propietario ?? "",
        email: paciente?.email ?? "",
        celular: paciente?.celular ?? "",
        salida: paciente?.salida
            ? new Date(paciente.salida).toLocaleDateString("en-CA", { timeZone: "UTC" })
            : "",
        convencional: paciente?.convencional ?? "",
        sintomas: paciente?.sintomas ?? "",
    };

    const onSubmit = async (values) => {
        try {
            //e.preventDefault(); // Agregamos preventDefault aquí

            if (paciente?._id) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`;
                const options = {
                    headers: {
                        method: "PUT",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, values, options);
                navigate("/dashboard/listar");
            } else {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(url, values, options);
                navigate("/dashboard/listar");
            }
        } catch (error) {
            console.log(error);
            setMensaje({ respuesta: error.response?.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });



    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (paciente?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/actualizar/${paciente?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/listar')
        } else {

        }

        try {
            const token = localStorage.getItem('token')
            // form.id = auth._id
            const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.post(url, form, options)
            navigate('/dashboard/listar')
        } catch (error) {
            setMensaje({ respuesta: error.response?.data.msg, tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">
                    Nombre de la mascota:
                </label>
                <input
                    id="nombre"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="nombre de la mascota"
                    name="nombre"
                    value={formik.values.nombre}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        formik.setFieldValue("nombre", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    pattern="[A-Za-z\s]*"
                    required
                />
                {formik.touched.nombre && formik.errors.nombre && (
                    <div className="text-red-500">{formik.errors.nombre}</div>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="propietario" className="text-gray-700 uppercase font-bold text-sm">
                    Nombre del propietario:
                </label>
                <input
                    id="propietario"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="nombre del propietario"
                    name="propietario"
                    value={formik.values.propietario}
                    onChange={(e) => {
                        // Elimina espacios en blanco al principio
                        const trimmedValue = e.target.value.replace(/^\s+/g, '');
                        formik.setFieldValue("propietario", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚ]+( [A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$"
                    required
                />
                {formik.touched.propietario && formik.errors.propietario && (
                    <div className="text-red-500">{formik.errors.propietario}</div>
                )}
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="email del propietario"
                    name="email"
                    value={formik.values.email}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        formik.setFieldValue("email", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    required
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="celular" className="text-gray-700 uppercase font-bold text-sm">
                    Celular:
                </label>
                <input
                    id="celular"
                    type="tel"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="celular del propietario"
                    name="celular"
                    value={formik.values.celular}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        formik.setFieldValue("celular", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    pattern="[0-9]{10}"
                    required
                />
                {formik.touched.celular && formik.errors.celular && (
                    <div className="text-red-500">{formik.errors.celular}</div>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="convencional" className="text-gray-700 uppercase font-bold text-sm">
                    Convencional:
                </label>
                <input
                    id="convencional"
                    type="tel"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="convencional del propietario"
                    name="convencional"
                    value={formik.values.convencional}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        formik.setFieldValue("convencional", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    pattern="[0-9]{7}"
                    required
                />
                {formik.touched.convencional && formik.errors.convencional && (
                    <div className="text-red-500">{formik.errors.convencional}</div>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="salida" className="text-gray-700 uppercase font-bold text-sm">
                    Fecha de salida:
                </label>
                <input
                    id="salida"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="salida"
                    name="salida"
                    value={formik.values.salida}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                />
                {formik.touched.salida && formik.errors.salida && (
                    <div className="text-red-500">{formik.errors.salida}</div>
                )}
            </div>
            <div className="mb-5">
                <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold text-sm">
                    Síntomas:
                </label>
                <input
                    id="sintomas"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Ingrese los síntomas de la mascota"
                    name="sintomas"
                    value={formik.values.sintomas}
                    onChange={(e) => {
                        // Elimina espacios en blanco al principio
                        const trimmedValue = e.target.value.replace(/^\s+/g, '');
                        formik.setFieldValue("sintomas", trimmedValue);
                    }}
                    onBlur={formik.handleBlur}
                    pattern="^[A-Za-zñÑáéíóúÁÉÍÓÚ]+( [A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$"
                    required
                />
                {formik.touched.sintomas && formik.errors.sintomas && (
                    <div className="text-red-500">{formik.errors.sintomas}</div>
                )}
            </div>
            <div>
                <input
                    type="submit"
                    className="bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all"
                    value={paciente?._id ? "Actualizar paciente" : "Registrar paciente"}
                />
            </div>
        </form>
    );
}