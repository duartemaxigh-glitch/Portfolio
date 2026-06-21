
const titulosHero = [
  'Desarrollador Frontend',
  'Desarrollador Backend',
  'Estudiante de Software',
];

const velocidadEscritura = 80;   
const velocidadBorrado   = 40;   
const tiempoEspera       = 2000; 


function inicializarTypewriter() {
  const elemento = document.getElementById('heroTitulo');
  if (!elemento) return;

  elemento.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'cursor-typewriter';
  cursor.textContent = '|';
  elemento.appendChild(cursor);

  let indiceTitulo = 0;

  /**
   * 
   * @param {string} texto
   * @param {number} indiceChar
   * @param {Function} alTerminar
   */
  function escribir(texto, indiceChar, alTerminar) {
    if (indiceChar <= texto.length) {
      // Actualizamos el texto visible (sin el cursor, que va aparte)
      elemento.firstChild.textContent = texto.substring(0, indiceChar);
      setTimeout(function () {
        escribir(texto, indiceChar + 1, alTerminar);
      }, velocidadEscritura);
    } else {
      // Terminó de escribir → esperamos y luego borramos
      setTimeout(alTerminar, tiempoEspera);
    }
  }

  /**
   * @param {Function} alTerminar
   */
  function borrar(alTerminar) {
    const textoActual = elemento.firstChild.textContent;
    if (textoActual.length > 0) {
      elemento.firstChild.textContent = textoActual.slice(0, -1);
      setTimeout(function () {
        borrar(alTerminar);
      }, velocidadBorrado);
    } else {
      alTerminar();
    }
  }

  function ciclo() {
    const tituloActual = titulosHero[indiceTitulo];
    escribir(tituloActual, 0, function () {
      borrar(function () {
        indiceTitulo = (indiceTitulo + 1) % titulosHero.length;
        ciclo(); 
      });
    });
  }

  ciclo();
}


/* ================================================================
    2. DATOS — HABILIDADES
   ================================================================ */

const habilidades = [
  {
    nombre:    'HTML5',
    nivel:     90,
    categoria: 'Frontend',
  },
  {
    nombre:    'CSS3',
    nivel:     85,
    categoria: 'Frontend',
  },
  {
    nombre:    'JavaScript',
    nivel:     75,
    categoria: 'Frontend',
  },
  {
    nombre:    'React',
    nivel:     65,
    categoria: 'Frontend',
  },
  {
    nombre:    'Python',
    nivel:     60,
    categoria: 'Backend',
  },
  {
    nombre:    'SQL / MySQL',
    nivel:     70,
    categoria: 'Base de Datos',
  },
  {
    nombre:    'Git & GitHub',
    nivel:     80,
    categoria: 'Herramientas',
  },
];


/* ================================================================
    3. DATOS — PROYECTOS
   ================================================================ */

const proyectos = [
  {
    titulo:'CRUDrugstore',
    descripcion:'Sistema de gestión para farmacia. Administra productos, ventas, compras, clientes y proveedores con autenticación por roles (jefe / empleado). Actualmente en desarrollo',
    imagen:'img/crud_drugstore.png',
    emoji:'🏪',
    tecnologias:['React', 'Tailwind CSS', 'FastAPI', 'Python', 'Clean Architecture'],
    enlaceDemo:'#',
    enlaceGithub:'https://github.com/duartemaxigh-glitch/DrugStore.git',
  },
  {
  titulo:'Portafolio Personal',
    descripcion:'Este mismo portafolio: diseño moderno y responsivo construido con HTML, CSS y JavaScript puro, sin frameworks ni dependencias externas.',
    imagen:'img/portfolio.png',
    emoji:'💼',
    tecnologias:['HTML', 'CSS', 'JavaScript'],
    enlaceDemo:'#',
    enlaceGithub:'https://github.com/duartemaxigh-glitch/Portfolio.git',
  },
  {
    titulo:'Copiloto financiero',
    descripcion:'Una plataforma de finanzas personales y análisis de inversiones para el mercado argentino. Desarrollada con Python, FastAPI y Clean Architecture, permite el seguimiento de cartera, la gestión de compra de dólares, el análisis de mercado y la obtención de perspectivas financieras asistidas por inteligencia artificial. Actualmente en desarrollo',
    imagen:'',
    emoji:'🚀',
    tecnologias:['Python', 'FastAPI', 'SQLite', 'Ollama', 'AI Integration', 'React',  'Tailwind CSS', 'Clean Architecture'],
    enlaceDemo:'#',
    enlaceGithub:'#',
  },
];


function renderizarHabilidades() {
  const contenedor = document.getElementById('contenedorHabilidades');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  habilidades.forEach(function (habilidad) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-habilidad animacion-entrada';

    tarjeta.innerHTML = `
      <div class="habilidad-encabezado">
        <span class="habilidad-nombre">${habilidad.nombre}</span>
        <span class="habilidad-porcentaje">${habilidad.nivel}%</span>
      </div>
      <div class="barra-progreso">
        <!-- data-nivel guarda el nivel para que la función de animación lo lea -->
        <div class="barra-relleno" data-nivel="${habilidad.nivel}"></div>
      </div>
      <span class="habilidad-categoria">${habilidad.categoria}</span>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function animarBarrasHabilidades() {
  const barras = document.querySelectorAll('.barra-relleno');
  barras.forEach(function (barra) {
    // Leemos el nivel desde el atributo data-nivel
    const nivel = barra.getAttribute('data-nivel') || '0';
    // Asignamos el width: la transición CSS se encarga de la animación
    barra.style.width = nivel + '%';
  });
}

function renderizarProyectos() {
  const contenedor = document.getElementById('contenedorProyectos');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  proyectos.forEach(function (proyecto) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-proyecto animacion-entrada';

    const htmlImagen = proyecto.imagen
      ? `<img
           src="${proyecto.imagen}"
           alt="Captura de pantalla de ${proyecto.titulo}"
           class="proyecto-imagen"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
         />
         <div class="proyecto-imagen-placeholder" style="display:none">
           ${proyecto.emoji || '💻'}
         </div>`
      : `<div class="proyecto-imagen-placeholder">
           ${proyecto.emoji || '💻'}
         </div>`;

    const htmlTecnologias = proyecto.tecnologias
      .map(function (tech) {
        return `<span class="tecnologia-badge">${tech}</span>`;
      })
      .join('');

    const iconoExterno = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>`;
    const iconoGithub = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>`;


    const tieneDemo   = proyecto.enlaceDemo   && proyecto.enlaceDemo   !== '#';
    const tieneGithub = proyecto.enlaceGithub && proyecto.enlaceGithub !== '#';

    const htmlLinks = `
      ${tieneDemo
        ? `<a href="${proyecto.enlaceDemo}" target="_blank" rel="noopener" class="proyecto-link">
             ${iconoExterno} Demo
           </a>`
        : `<span class="proyecto-link" style="opacity:.35;cursor:not-allowed">Sin demo</span>`
      }
      ${tieneGithub
        ? `<a href="${proyecto.enlaceGithub}" target="_blank" rel="noopener" class="proyecto-link">
             ${iconoGithub} Código
           </a>`
        : `<span class="proyecto-link" style="opacity:.35;cursor:not-allowed">Sin repo</span>`
      }
    `;

    tarjeta.innerHTML = `
      ${htmlImagen}
      <div class="proyecto-contenido">
        <h3 class="proyecto-titulo">${proyecto.titulo}</h3>
        <p class="proyecto-descripcion">${proyecto.descripcion}</p>
        <div class="proyecto-tecnologias">${htmlTecnologias}</div>
        <div class="proyecto-links">${htmlLinks}</div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}


/* ================================================================
    6. NAVBAR
   ================================================================ */

function inicializarMenuMovil() {
  const botonMenu = document.getElementById('botonMenu');
  const navLinks  = document.getElementById('navLinks');
  if (!botonMenu || !navLinks) return;

  botonMenu.addEventListener('click', function () {
    const estaAbierto = navLinks.classList.contains('abierto');
    if (estaAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  navLinks.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('click', function (evento) {
    const clickDentroDelMenu = botonMenu.contains(evento.target)
                            || navLinks.contains(evento.target);
    if (!clickDentroDelMenu) {
      cerrarMenu();
    }
  });
}

function abrirMenu() {
  const botonMenu = document.getElementById('botonMenu');
  const navLinks  = document.getElementById('navLinks');
  navLinks.classList.add('abierto');
  botonMenu.classList.add('abierto');
  botonMenu.setAttribute('aria-label', 'Cerrar menú');
}

function cerrarMenu() {
  const botonMenu = document.getElementById('botonMenu');
  const navLinks  = document.getElementById('navLinks');
  navLinks.classList.remove('abierto');
  botonMenu.classList.remove('abierto');
  botonMenu.setAttribute('aria-label', 'Abrir menú');
}

function inicializarLinkActivo() {
  const secciones = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    const posicionActual = window.scrollY + 120;

    let seccionVisible = '';
    secciones.forEach(function (seccion) {
      if (seccion.offsetTop <= posicionActual) {
        seccionVisible = seccion.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('activo');
      if (link.getAttribute('href') === '#' + seccionVisible) {
        link.classList.add('activo');
      }
    });
  });
}

function inicializarScrollNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolleada');
    } else {
      navbar.classList.remove('scrolleada');
    }
  });
}


/* ================================================================
    7. ANIMACIONES DE ENTRADA (Intersection Observer)
 */

function inicializarAnimaciones() {
  const opcionesObserver = {
    threshold:  0.1,              // 10% del elemento debe ser visible
    rootMargin: '0px 0px -40px 0px', // Margen para activar un poco antes del borde
  };

  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');

        if (entrada.target.closest('#habilidades')) {
          setTimeout(animarBarrasHabilidades, 350);
        }

        observer.unobserve(entrada.target);
      }
    });
  }, opcionesObserver);

  document.querySelectorAll('.animacion-entrada').forEach(function (el) {
    observer.observe(el);
  });
}


/* ================================================================
    8. BOTÓN VOLVER ARRIBA
   ================================================================ */

function inicializarBotonInicio() {
  const boton = document.getElementById('botonInicio');
  if (!boton) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      boton.classList.add('visible');
    } else {
      boton.classList.remove('visible');
    }
  });

  boton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ================================================================
    9. FORMULARIO DE CONTACTO
   ================================================================ */


function inicializarFormulario() {
  const formulario  = document.getElementById('formularioContacto');
  const mensajeDiv  = document.getElementById('mensajeFormulario');
  const botonEnviar = document.getElementById('botonEnviar');
  if (!formulario) return;

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const textoOriginal = botonEnviar.textContent;
    botonEnviar.textContent = 'Enviando...';
    botonEnviar.disabled = true;


    const accion = formulario.getAttribute('action') || '';
    const tieneEndpoint = accion !== '' && accion !== '#';

    if (!tieneEndpoint) {
      // ── MODO DEMO (sin endpoint configurado) ──────────────────────────
      setTimeout(function () {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;
        mostrarMensaje(mensajeDiv, '¡Mensaje enviado! Te respondo a la brevedad.', 'exito');
        formulario.reset();
        setTimeout(function () { ocultarMensaje(mensajeDiv); }, 6000);
      }, 1200);
      return;
    }

    // ── MODO REAL  ─────────────
    const datos = new FormData(formulario);

    fetch(accion, {
      method: 'POST',
      body: datos,
      headers: { 'Accept': 'application/json' },
    })
      .then(function (respuesta) {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;

        if (respuesta.ok) {
          mostrarMensaje(mensajeDiv, '¡Mensaje enviado! Te respondo a la brevedad.', 'exito');
          formulario.reset();
        } else {
          mostrarMensaje(mensajeDiv, 'Hubo un error al enviar. Intentá de nuevo.', 'error');
        }
        setTimeout(function () { ocultarMensaje(mensajeDiv); }, 6000);
      })
      .catch(function () {
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;
        mostrarMensaje(mensajeDiv, 'Error de conexión. Revisá tu internet e intentá de nuevo.', 'error');
      });
  });
}

/**
 * 
 * @param {HTMLElement} elemento
 * @param {string}      texto
 * @param {string}      tipo
 */
function mostrarMensaje(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = 'form-mensaje ' + tipo;
}

function ocultarMensaje(elemento) {
  elemento.textContent = '';
  elemento.className = 'form-mensaje';
}


/* ================================================================
   10. INICIALIZACIÓN — PUNTO DE ENTRADA PRINCIPAL
   ================================================================ */

function inicializar() {
  renderizarHabilidades();
  renderizarProyectos();

  inicializarMenuMovil();
  inicializarLinkActivo();
  inicializarScrollNavbar();

  inicializarAnimaciones();

  inicializarTypewriter();

  inicializarBotonInicio();

  inicializarFormulario();
}

document.addEventListener('DOMContentLoaded', inicializar);
