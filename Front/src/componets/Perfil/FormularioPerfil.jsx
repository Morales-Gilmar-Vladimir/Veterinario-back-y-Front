import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Mensaje from "../Alertas/Mensaje";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormularioPerfil = () => {
  const [mensaje, setMensaje] = useState({});
  const { auth, actualizarPerfil } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      id: auth._id,
      nombre: auth.nombre || "",
      apellido: auth.apellido || "",
      direccion: auth.direccion || "",
      telefono: auth.telefono || "",
      email: auth.email || "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .matches(/^[A-Za-zñÑ\s]+$/, "Solo letras y espacios son permitidos")
        .required("El nombre es requerido"),
      apellido: Yup.string()
        .matches(/^[A-Za-zñÑ\s]+$/, "Solo letras y espacios son permitidos")
        .required("El apellido es requerido"),
      direccion: Yup.string().required("La dirección es requerida"),
      telefono: Yup.string()
        .matches(/^\d{10}$/, "El teléfono debe contener 10 dígitos numéricos")
        .required("El teléfono es requerido"),
      email: Yup.string()
        .email("Correo electrónico no válido")
        .required("El correo electrónico es requerido"),
      id: Yup.string(),
    }),
    onSubmit: async (values) => {
      const resultado = await actualizarPerfil(values);
      setMensaje(resultado);
      setTimeout(() => {
        setMensaje({});
      }, 3000);
    },
  });
    // Función para eliminar espacios en blanco al principio y al final
    const trimInputValue = (e) => {
      const { name, value } = e.target;
      formik.setFieldValue(name, value.trim());
    };
    
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(form).includes("")) {
      setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
      setTimeout(() => {
        setMensaje({})
      }, 3000);
      return
    }
    const resultado = await actualizarPerfil(form)
    setMensaje(resultado)
    setTimeout(() => {
      setMensaje({})
    }, 3000);
  }


  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}
      <div className="mb-5">
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:
        </label>
        <input
          id="nombre"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md  ${formik.touched.nombre && formik.errors.nombre
              ? "border-red-500"
              : "border-gray-300"
            }`}
          placeholder="nombre"
          name="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre ? (
          <div className="text-red-500 text-sm">
            {formik.errors.nombre}
          </div>
        ) : null}
      </div>

      <div className="mb-5" >
        <label
          htmlFor="apellido"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Apellido:
        </label>
        <input
          id="apellido"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md  ${formik.touched.apellido && formik.errors.apellido
              ? "border-red-500"
              : "border-gray-300"
            }`}
          placeholder="apellido"
          name="apellido"
          value={formik.values.apellido}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.apellido && formik.errors.apellido ? (
          <div className="text-red-500 text-sm">
            {formik.errors.apellido}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="direccion"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Dirección:
        </label>
        <input
          id="direccion"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md  ${formik.touched.direccion && formik.errors.direccion
              ? "border-red-500"
              : "border-gray-300"
            }`}
          placeholder="direccion"
          name="direccion"
          value={formik.values.direccion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.direccion && formik.errors.direccion ? (
          <div className="text-red-500 text-sm">
            {formik.errors.direccion}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="telefono"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Teléfono:
        </label>
        <input
          id="telefono"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md ${formik.touched.telefono && formik.errors.telefono
              ? "border-red-500"
              : "border-gray-300"
            }`}
          placeholder="telefono"
          name="telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telefono && formik.errors.telefono ? (
          <div className="text-red-500 text-sm">
            {formik.errors.telefono}
          </div>
        ) : null}
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email:
        </label>
        <input
          id="email"
          type="text"
          className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md  ${formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
            }`}
          placeholder="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <input
        type="submit"
        className="bg-gray-800 w-full p-3 
        text-slate-300 uppercase font-bold rounded-lg 
        hover:bg-gray-600 cursor-pointer transition-all"
        value="Actualizar"
      />
    </form>
  );
};

export default FormularioPerfil;