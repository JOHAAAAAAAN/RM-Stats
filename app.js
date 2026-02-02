/* app.js ACTUALIZADO */

const nombresMeses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// 1. Generar menú lateral (Solo hasta el mes actual)
function renderizarMenu() {
    const contenedor = document.getElementById("menu-meses");
    const fechaHoy = new Date();
    const mesActual = fechaHoy.getMonth() + 1; 

    let html = "";
    for (let i = 1; i <= mesActual; i++) {
        html += `<button onclick="cargarDatos(${i})" class="nav-btn">📅 ${nombresMeses[i]}</button>`;
    }
    contenedor.innerHTML = html;
}

// 2. Calcular Racha ACTUAL (Mirando todo el historial global)
function calcularRachaActual(nombreJugador, todosLosPartidos) {
    let misPartidos = todosLosPartidos.filter(p => p.jugador === nombreJugador);
    if (misPartidos.length === 0) return "-";

    let ultimoResultado = misPartidos[misPartidos.length - 1].resultado;
    let contador = 0;

    // Contamos hacia atrás desde el último partido jugado
    for (let i = misPartidos.length - 1; i >= 0; i--) {
        if (misPartidos[i].resultado === ultimoResultado) {
            contador++;
        } else {
            break; 
        }
    }

    let icono = ultimoResultado === "V" ? "🔥" : "❄️";
    return icono.repeat(contador);
}

// 3. Calcular Rachas MÁXIMAS (Históricas del año)
function calcularRachasHistoricas(nombreJugador, todosLosPartidos) {
    let misPartidos = todosLosPartidos.filter(p => p.jugador === nombreJugador);
    if (misPartidos.length === 0) return "-";

    let maxVictoria = 0;
    let maxDerrota = 0;
    
    let actualVictoria = 0;
    let actualDerrota = 0;

    misPartidos.forEach(p => {
        if (p.resultado === 'V') {
            actualVictoria++;
            actualDerrota = 0; // Se corta la racha de derrotas
            if (actualVictoria > maxVictoria) maxVictoria = actualVictoria;
        } else {
            actualDerrota++;
            actualVictoria = 0; // Se corta la racha de victorias
            if (actualDerrota > maxDerrota) maxDerrota = actualDerrota;
        }
    });

    // Construimos el string con los máximos
    let resultado = "";
    if (maxVictoria > 0) resultado += "🔥".repeat(maxVictoria);
    if (maxVictoria > 0 && maxDerrota > 0) resultado += " <span style='color:#555'>|</span> "; // Separador visual
    if (maxDerrota > 0) resultado += "❄️".repeat(maxDerrota);

    return resultado || "-";
}

// 4. Función Principal: Cargar Datos y Dibujar Tabla
function cargarDatos(filtro) {
    const tbody = document.getElementById("tabla-body");
    const titulo = document.getElementById("titulo-pagina");
    const headerRacha = document.getElementById("header-racha");
    
    // Obtener fecha real de hoy para comparaciones
    const fechaHoy = new Date();
    const mesActualReal = fechaHoy.getMonth() + 1; 

    tbody.innerHTML = "";
    
    // Limpiar botones activos
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    // --- DICCIONARIO DE FOTOS ---
    const fotos = {
        "Isra": "foto1.jpg",
        "Mois": "foto2.jpg",
        "Seba": "foto3.jpg"
    };
    // ----------------------------

    // Lógica de visualización de columnas y títulos
    let mostrarColumnaRacha = false;

    if (filtro === 'anual') {
        titulo.innerText = "🏆 Tabla Anual Global";
        document.getElementById('btn-anual').classList.add('active');
        
        // En anual mostramos la columna pero con otro título
        if(headerRacha) {
            headerRacha.style.display = "";
            headerRacha.innerText = "Rachas Max";
        }
        mostrarColumnaRacha = true;

    } else {
        titulo.innerText = "📅 Estadísticas de " + nombresMeses[filtro];
        
        // Activar botón del mes correspondiente
        let botones = document.querySelectorAll('#menu-meses button');
        if(botones[filtro - 1]) botones[filtro - 1].classList.add('active');

        // Lógica de Racha en Meses
        if (filtro === mesActualReal) {
            // Si es el mes presente, mostramos racha actual
            if(headerRacha) {
                headerRacha.style.display = "";
                headerRacha.innerText = "Racha Actual";
            }
            mostrarColumnaRacha = true;
        } else {
            // Si es un mes pasado, ocultamos la columna
            if(headerRacha) headerRacha.style.display = "none";
            mostrarColumnaRacha = false;
        }
    }

    // Filtrar partidos para las estadísticas numéricas (Goles, V/D, etc)
    let partidosFiltrados = dataPartidos;
    if (filtro !== 'anual') {
        partidosFiltrados = dataPartidos.filter(p => p.mes === filtro);
    }

    // Calcular Estadísticas
    let stats = jugadores.map(nombre => {
        // Datos filtrados (para sumar goles y victorias del mes/año seleccionado)
        let misPartidosFiltrados = partidosFiltrados.filter(p => p.jugador === nombre);
        
        let victorias = misPartidosFiltrados.filter(p => p.resultado === 'V').length;
        let derrotas = misPartidosFiltrados.filter(p => p.resultado === 'D').length;
        let goles = misPartidosFiltrados.reduce((acc, curr) => acc + curr.goles, 0);
        let jugados = victorias + derrotas;
        let winRate = jugados > 0 ? Math.round((victorias / jugados) * 100) : 0;
        
        // CÁLCULO DE RACHA (Diferenciado)
        let rachaDisplay = "";
        if (filtro === 'anual') {
            // En anual: Calculamos máximos históricos usando TODOS los datos
            rachaDisplay = calcularRachasHistoricas(nombre, dataPartidos);
        } else if (filtro === mesActualReal) {
            // En mes actual: Calculamos racha actual usando TODOS los datos (para que no se corte)
            rachaDisplay = calcularRachaActual(nombre, dataPartidos);
        }
        // Si es mes pasado, rachaDisplay queda vacío

        return { nombre, victorias, derrotas, goles, jugados, winRate, rachaDisplay };
    });

    // Ordenar: Mayor WinRate primero, desempate por Victorias
    stats.sort((a, b) => b.winRate - a.winRate || b.victorias - a.victorias);

    // Dibujar Filas
    stats.forEach((jugador, index) => {
        // Lógica de Colores
        let colorBadge;
        if (jugador.winRate > 90) colorBadge = '#00e676';      
        else if (jugador.winRate >= 70) colorBadge = '#2979ff'; 
        else if (jugador.winRate >= 60) colorBadge = '#ffea00'; 
        else if (jugador.winRate >= 50) colorBadge = '#ff9100'; 
        else colorBadge = '#ff1744';                            
        
        // Celda Racha (Solo si decidimos mostrarla arriba)
        let celdaRacha = mostrarColumnaRacha ? `<td>${jugador.rachaDisplay}</td>` : '';
        
        let fotoPerfil = fotos[jugador.nombre] || "https://via.placeholder.com/35";

        let fila = `
            <tr>
                <td class="${index === 0 ? 'gold' : ''}">#${index + 1}</td>
                
                <td class="player-cell">
                    <img src="${fotoPerfil}" class="avatar" alt="foto">
                    <span class="player-name">${jugador.nombre} ${index === 0 ? '👑' : ''}</span>
                </td>

                <td>${jugador.victorias} / ${jugador.derrotas}</td>
                <td><span class="badge" style="background-color:${colorBadge}">${jugador.winRate}%</span></td>
                <td>${jugador.goles}</td>
                ${celdaRacha}
                <td>${jugador.jugados}</td>
            </tr>
        `;
        tbody.innerHTML += fila;
    });
}

// INICIO AUTOMÁTICO
renderizarMenu();

// Detectar mes actual y cargar
const fechaHoy = new Date();
const mesActualInicial = fechaHoy.getMonth() + 1; 
cargarDatos(mesActualInicial);