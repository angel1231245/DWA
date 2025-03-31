const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close');

function openModal(title, text, imageUrl) {
    modal.style.display = 'block';
    modalTitle.innerText = title;
    modalText.innerHTML = `<div class="term-content">${text}</div>`;
    modalImage.src = imageUrl;
}


closeModal.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

document.querySelector('.information ul').addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();

        if (e.target.innerText === 'Acerca de Nosotros') {
            openModal('Acerca de Nosotros', `
                        <p>En Snappy, nos tomamos muy en serio la privacidad y seguridad de tus datos. Esta Política de Privacidad describe cómo recopilamos, usamos, y protegemos la información que obtenemos a través de nuestra aplicación. Al utilizar nuestra aplicación, aceptas las prácticas descritas en esta política.</p>
                        <ol>
                            <li><strong>¿Quienes somos?</strong>Somos un grupo de estudiantes del Tecnológico de Tuxtla Gutiérrez, comprometidos con la excelencia y la innovación en el campo de la tecnología y la logística. Nuestro equipo combina conocimientos en ingeniería de sistemas, análisis de datos y gestión de logística para desarrollar una herramienta que simplifique la planificación y ejecución de rutas de entrega.</li>
                            <li><strong>¿Qué hacemos?</strong>Nuestra aplicación utiliza algoritmos avanzados para generar rutas de entrega óptimas, adaptadas a las necesidades específicas de cada empresa. Al integrar datos en tiempo real, como el tráfico y las condiciones meteorológicas, ofrecemos soluciones dinámicas que mejoran la eficiencia operativa y reducen el tiempo de entrega.</li>
                            <li><strong>¿Por qué elegirnos?</strong> Elegir Snappy significa optar por una herramienta desarrollada con pasión y precisión por un equipo de jóvenes talentos que entiende las demandas del mundo actual. Nuestra combinación de tecnología avanzada y enfoque práctico garantiza que tu empresa obtenga una ventaja competitiva en la gestión de sus entregas.</li>
                        </ol>
                    `);
        } else if (e.target.innerText === 'Políticas de Privacidad') {
            openModal('Políticas de Privacidad', `
                            <p>En Snappy, nos tomamos muy en serio la privacidad y seguridad de tus datos. Esta Política de Privacidad describe cómo recopilamos, usamos, y protegemos la información que obtenemos a través de nuestra aplicación. Al utilizar nuestra aplicación, aceptas las prácticas descritas en esta política.</p>
                            <h3>Información que Recopilamos</h3>
                            <ol>
                                <li><strong>Información Personal:</strong> Recopilamos información personal que nos proporcionas directamente, como tu nombre, dirección de correo electrónico, y cualquier otra información que decidas compartir al registrarte y utilizar nuestra aplicación.</li>
                                <li><strong>Información de Uso:</strong> Recopilamos datos sobre tu uso de la aplicación, incluyendo información sobre las rutas de entrega generadas, las interacciones con la aplicación, y los datos técnicos sobre tu dispositivo y conexión.</li>
                                <li><strong>Información de Ubicación:</strong> Para ofrecerte rutas de entrega precisas, recopilamos datos sobre la ubicación de tu dispositivo, siempre que tengas habilitados los servicios de ubicación.</li>
                            </ol>
                            <h3>Cómo Usamos Tu Información</h3>
                            <ul>
                                <li>Proporcionar y Mejorar Nuestros Servicios.</li>
                                <li>Comunicación.</li>
                                <li>Análisis.</li>
                            </ul>
                            <h3>Compartición de Información</h3>
                            <p>No compartimos tu información personal con terceros, excepto en circunstancias específicas.</p>
                            <h3>Seguridad de la Información</h3>
                            <p>Implementamos medidas de seguridad razonables, pero no podemos garantizar la seguridad absoluta de la información.</p>
                            <h3>Derechos del Usuario</h3>
                            <p>Puedes tener derechos sobre tu información personal, como acceso, corrección y eliminación.</p>
                            <h3>Cambios a Esta Política</h3>
                            <p>Podemos actualizar esta Política de Privacidad de vez en cuando.</p>
                        `);
        } else if (e.target.innerText === 'Términos y condiciones') {
            openModal('Términos y Condiciones', `
                            <p>Última actualización: 29/08/2024</p>
                            <p>Bienvenido a Snappy. Estos términos y condiciones establecen las normas y pautas para el uso de nuestro sitio web, www.snappy.com, y de los servicios proporcionados por Snappy. Al acceder o utilizar nuestros servicios, usted acepta cumplir con estos términos y condiciones.</p>
                            <h3>1. Aceptación de los Términos</h3>
                            <p>Al utilizar nuestro sitio web y nuestros servicios, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro sitio web ni nuestros servicios.</p>
                            <h3>2. Uso del Sitio Web</h3>
                            <ul>
                                <li>Requisitos de Edad: Debe tener al menos 18 años o tener el consentimiento de un padre o tutor.</li>
                                <li>Cuenta de Usuario: Es necesario registrarse y crear una cuenta para acceder a las funciones del sitio.</li>
                                <li>Uso Permitido: Se compromete a utilizar nuestro sitio web únicamente para fines legales.</li>
                            </ul>
                            <h3>3. Propiedad Intelectual</h3>
                            <p>Todos los contenidos del sitio web son propiedad de Snappy y están protegidos por las leyes de derechos de autor.</p>
                            <h3>4. Limitación de Responsabilidad</h3>
                            <p>Snappy no será responsable de ningún daño que resulte del uso o la imposibilidad de usar nuestro sitio web o servicios.</p>
                            <h3>5. Modificación de los Servicios</h3>
                            <p>Nos reservamos el derecho de modificar o descontinuar el sitio web o cualquier servicio con o sin previo aviso.</p>
                            <h3>6. Enlaces a Sitios de Terceros</h3>
                            <p>No somos responsables de las prácticas de privacidad o del contenido de esos sitios web.</p>
                            <h3>7. Terminación del Acceso</h3>
                            <p>Podemos suspender o terminar su acceso al sitio web en cualquier momento.</p>
                            <h3>8. Ley Aplicable y Jurisdicción</h3>
                            <p>Estos términos se regirán de acuerdo con las leyes de México.</p>
                            <h3>9. Cambios en los Términos y Condiciones</h3>
                            <p>Nos reservamos el derecho de actualizar o modificar estos Términos y Condiciones en cualquier momento.</p>
                            <h3>10. Contacto</h3>
                            <p>Si tiene alguna pregunta, contáctenos en snappyrutas@gmail.com.</p>
                        `);
        }
    }
});
