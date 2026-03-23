/* app.js ACTUALIZADO (Sin % WIN visual) */

const nombresMeses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

function calcularRachaActual(nombreJugador, todosLosPartidos) {
    let misPartidos = todosLosPartidos.filter(p => p.jugador === nombreJugador && p.resultado !== 'E');
    if (misPartidos.length === 0) return "-";

    let ultimoResultado = misPartidos[misPartidos.length - 1].resultado;
    let contador = 0;

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

function calcularRachasHistoricas(nombreJugador, todosLosPartidos) {
    let misPartidos = todosLosPartidos.filter(p => p.jugador === nombreJugador && p.resultado !== 'E');
    if (misPartidos.length === 0) return "-";

    let maxVictoria = 0;
    let maxDerrota = 0;
    
    let actualVictoria = 0;
    let actualDerrota = 0;

    misPartidos.forEach(p => {
        if (p.resultado === 'V') {
            actualVictoria++;
            actualDerrota = 0; 
            if (actualVictoria > maxVictoria) maxVictoria = actualVictoria;
        } else {
            actualDerrota++;
            actualVictoria = 0; 
            if (actualDerrota > maxDerrota) maxDerrota = actualDerrota;
        }
    });

    let resultado = "";
    if (maxVictoria > 0) resultado += "🔥".repeat(maxVictoria);
    if (maxVictoria > 0 && maxDerrota > 0) resultado += " <span style='color:#555'>|</span> "; 
    if (maxDerrota > 0) resultado += "❄️".repeat(maxDerrota);

    return resultado || "-";
}

function getPerformanceColor(rate) {
    if (rate > 90) return '#00e676';      
    if (rate >= 70) return '#2979ff';     
    if (rate >= 60) return '#ffea00';     
    if (rate >= 50) return '#ff9100';     
    return '#ff1744';                     
}

function cargarDatos(filtro) {
    const tbody = document.getElementById("tabla-body");
    const titulo = document.getElementById("titulo-pagina");
    const headerRacha = document.getElementById("header-racha");
    
    const fechaHoy = new Date();
    const mesActualReal = fechaHoy.getMonth() + 1; 

    tbody.innerHTML = "";
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const fotos = {
        "Isra": "foto1.jpg",
        "Mois": "foto2.jpg",
        "Seba": "foto3.jpg"
    };

    let mostrarColumnaRacha = false;

    if (filtro === 'anual') {
        titulo.innerText = "🏆 Tabla Anual Global";
        document.getElementById('btn-anual').classList.add('active');
        
        if(headerRacha) {
            headerRacha.style.display = "";
            headerRacha.innerText = "Rachas Max";
        }
        mostrarColumnaRacha = true;

    } else {
        titulo.innerText = "📅 Estadísticas de " + nombresMeses[filtro];
        
        let botones = document.querySelectorAll('#menu-meses button');
        if(botones[filtro - 1]) botones[filtro - 1].classList.add('active');

        if (filtro === mesActualReal) {
            if(headerRacha) {
                headerRacha.style.display = "";
                headerRacha.innerText = "Racha Actual";
            }
            mostrarColumnaRacha = true;
        } else {
            if(headerRacha) headerRacha.style.display = "none";
            mostrarColumnaRacha = false;
        }
    }

    let partidosFiltrados = dataPartidos;
    if (filtro !== 'anual') {
        partidosFiltrados = dataPartidos.filter(p => p.mes === filtro);
    }

    let stats = jugadores.map(nombre => {
        let misPartidosFiltrados = partidosFiltrados.filter(p => p.jugador === nombre);
        
        let victorias = misPartidosFiltrados.filter(p => p.resultado === 'V').length;
        let empates = misPartidosFiltrados.filter(p => p.resultado === 'E').length; 
        let derrotas = misPartidosFiltrados.filter(p => p.resultado === 'D').length;
        let goles = misPartidosFiltrados.reduce((acc, curr) => acc + curr.goles, 0);
        let jugados = victorias + empates + derrotas; 
        
        let winRate = jugados > 0 ? Math.round((victorias / jugados) * 100) : 0; 
        
        let puntos = (victorias * 3) + (empates * 1); 
        let puntosMaximos = jugados * 3; 
        let rendRate = jugados > 0 ? Math.round((puntos / puntosMaximos) * 100) : 0; 

        let rachaDisplay = "";
        if (filtro === 'anual') {
            rachaDisplay = calcularRachasHistoricas(nombre, dataPartidos);
        } else if (filtro === mesActualReal) {
            rachaDisplay = calcularRachaActual(nombre, dataPartidos);
        }

        return { nombre, victorias, empates, derrotas, goles, jugados, winRate, puntos, puntosMaximos, rendRate, rachaDisplay };
    });

    // Ordenamiento: Primero % Rendimiento, luego Puntos, luego % Win (como desempate interno)
    stats.sort((a, b) => b.rendRate - a.rendRate || b.puntos - a.puntos || b.winRate - a.winRate);

    stats.forEach((jugador, index) => {
        let colorRendRate = getPerformanceColor(jugador.rendRate);
        
        let celdaRacha = mostrarColumnaRacha ? `<td>${jugador.rachaDisplay}</td>` : '';
        let fotoPerfil = fotos[jugador.nombre] || "https://via.placeholder.com/35";

        let fila = `
            <tr>
                <td class="${index === 0 ? 'gold' : ''}">#${index + 1}</td>
                
                <td class="player-cell">
                    <img src="${fotoPerfil}" class="avatar" alt="foto">
                    <span class="player-name">${jugador.nombre} ${index === 0 ? '👑' : ''}</span>
                </td>

                <td><span class="badge" style="background-color:${colorRendRate}">${jugador.rendRate}%</span> <span style="font-size:0.8rem; color:#888;">(${jugador.puntos} / ${jugador.puntosMaximos} pts)</span></td>

                <td>${jugador.victorias} / ${jugador.empates} / ${jugador.derrotas}</td>
                
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

const fechaHoy = new Date();
const mesActualInicial = fechaHoy.getMonth() + 1; 
cargarDatos(mesActualInicial);