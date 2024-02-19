import logoDarkMode from '../assets/dark.png'
import logoFacebook from '../assets/facebook.png'
import logoGithub from '../assets/github.png'
import logoLinkedind from '../assets/linkedin.png'
import logoRocket from '../assets/rocket.webp'
import imgConsultas from '../assets/consultas_medicas.jpeg'
import imgVacunacion from '../assets/vacunacion.jpg'
import imgCirugia from '../assets/cirugia.png'
import imgNutricion from '../assets/nutricion.jpg'
import intClinica1 from '../assets/int1.jpg'
import intClinica2 from '../assets/int2.jpg'
import intClinica3 from '../assets/int3.jpg'
import intClinica4 from '../assets/int4.jpg'
import { useState } from 'react'
import {Link} from 'react-router-dom'


export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" :""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>
                    <nav className='p-10 mb-12 flex justify-between'>
                        <h1 className='text-2xl font-bold dark:text-white'>Grupo 2</h1>
                        <ul className='flex items-center'>
                            <li><img onClick={()=>setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40}/></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Iniciar sesión</Link></li>
                        </ul>
                    </nav>

                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Bienvenidos a la Veterinaria del Grupo 2</h2>
                        <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Tu Clínica Veterinaria de Confianza</h3>
                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>Aqui entendemos que tus mascotas son parte de tu familia. Nuestra misión es proporcionar atención médica de alta calidad, con un enfoque en el bienestar y la salud de tus compañeros peludos. Con años de experiencia y un equipo de veterinarios apasionados, estamos aquí para cuidar de tus mascotas como si fueran nuestras propias.</p>
                    </div>

                    <div className='text-5xl flex justify-center gap-16 py-3'>
                        <img src={logoFacebook} alt="logo-redes" width={50} height={50}  className={'dark:border-2 border-teal-300 rounded-full'}/>
                        <a href="https://github.com/Morales-Gilmar-Vladimir" target="_blank">
                            <img src={logoGithub} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>
                        </a>
                        <img src={logoLinkedind} alt="logo-redes" width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'}/>
                    </div>
                </section>

                <section>
                    <div>
                        <h3 className='text-3xl py-1 dark:text-white'>Servicios Ofrecidos</h3>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Nuestra prioridad es la salud y el bienestar 
                        de tus mascotas. Nos comprometemos a ofrecer atención de alta calidad, utilizando las últimas tecnologías y tratamientos. 
                        Trabajamos estrechamente contigo para crear planes de cuidado personalizados y garantizar que tus amigos de cuatro patas 
                        tengan una vida feliz y saludable.</p>
                        <p className='text-md py-2 leading-8 text-gray-800 dark:text-white'>Por ello los servicios que se destacan son los siguientes:</p>
                    </div>

                    <div className='md:flex md:flex-wrap lg:flex lg:justify-center gap-10'>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={imgConsultas} alt="Imagen Consultas Medicas" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Consultas médicas</h3>
                            <p className='py-4 text-teal-600'>Nuestras consultas médicas son el primer paso hacia la salud 
                            y el bienestar de tu mascota. Nuestro equipo de veterinarios altamente capacitado realiza 
                            evaluaciones exhaustivas para diagnosticar y tratar afecciones médicas. Ya sea para una 
                            revisión anual de rutina o para abordar preocupaciones específicas de salud, estamos aquí 
                            para brindar atención compasiva y experta.</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-300'>
                            <img className='mx-auto' src={imgVacunacion} alt="Imagen Vacunacion" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Vacunación y prevención</h3>
                            <p className='py-4 text-teal-600'>La prevención es fundamental para la salud a largo 
                            plazo de tus mascotas. En MedPaws, ofrecemos un programa completo de vacunación y 
                            prevención para proteger a tus amigos de cuatro patas contra enfermedades comunes y 
                            amenazas para la salud.</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={imgNutricion} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Nutrición y asesoramiento dietético</h3>
                            <p className='py-4 text-teal-600'>La alimentación adecuada es esencial para el bienestar 
                            de tus mascotas. En MedPaws, entendemos la importancia de una dieta equilibrada y adaptada 
                            a las necesidades de tu mascota. Nuestros expertos en nutrición veterinaria te brindarán 
                            asesoramiento dietético personalizado, recomendaciones de alimentos de alta calidad y 
                            consejos sobre cómo mantener un peso saludable.</p>
                        </div>
                        <div className='text-center shadow-2xl p-10 rounded-xl my-10 md:w-72 lg:w-96 dark:bg-slate-100'>
                            <img className='mx-auto' src={imgCirugia} alt="" />
                            <h3 className='text-lg font-medium pt-8 pb-2'>Cirugía general y especializada</h3>
                            <p className='py-4 text-teal-600'>En MedPaws, ofrecemos una amplia gama de servicios 
                            quirúrgicos, desde procedimientos de rutina hasta cirugía especializada. Nuestro 
                            equipo quirúrgico altamente experimentado y nuestro entorno quirúrgico de vanguardia 
                            garantizan la seguridad y el bienestar de tu mascota durante todo el proceso. Ya sea 
                            una cirugía de esterilización de rutina, una cirugía dental o un procedimiento más complejo, 
                            puedes confiar en nuestro compromiso con la atención quirúrgica de alta calidad.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div>
                        <h3 className='text-3xl py-1 dark:text-white'>Nuestra Clínica en Imágenes</h3>
                    </div>

                    <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
                        <div className="basis-1/3 flex-1 ">
                            <img
                                className="rounded-lg object-cover"
                                src={intClinica1}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={intClinica2}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-fill"
                                src={intClinica3}
                            />
                        </div>
                        <div className="basis-1/3 flex-1">
                            <img
                                className="rounded-lg object-cover"
                                src={intClinica4}
                            />
                        </div>
                    </div>
                </section>

            </main>

        </div>
    )
}