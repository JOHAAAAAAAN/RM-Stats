/* data.js */
const dataPartidos = [
    // MES 1 = ENERO, 2 = FEBRERO, etc.
    // R = Resultado ('V' = Victoria, 'E' = Empate, 'D' = Derrota)
    
    // Partidos de ejemplo de Enero
    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "V", goles: 0 },

    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "D", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "D", goles: 0 },

    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "D", goles: 0 },

    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "V", goles: 0 },

    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "V", goles: 0 },

    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Seba", resultado: "D", goles: 0 },
    
    { mes: 1, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 1, jugador: "Mois", resultado: "D", goles: 3 },
    { mes: 1, jugador: "Seba", resultado: "V", goles: 3 },
    
    // Partidos de Febrero
    { mes: 2, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 2, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 2, jugador: "Seba", resultado: "V", goles: 1 },

    { mes: 2, jugador: "Isra", resultado: "V", goles: 2 },
    { mes: 2, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 2, jugador: "Seba", resultado: "V", goles: 4 },
    
    { mes: 2, jugador: "Isra", resultado: "D", goles: 2 },
    { mes: 2, jugador: "Mois", resultado: "D", goles: 0 },
    { mes: 2, jugador: "Seba", resultado: "D", goles: 4 },

    { mes: 2, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 2, jugador: "Mois", resultado: "D", goles: 0 },
    { mes: 2, jugador: "Seba", resultado: "D", goles: 2 },
    
    { mes: 2, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 2, jugador: "Mois", resultado: "V", goles: 4 },
    { mes: 2, jugador: "Seba", resultado: "V", goles: 4 },

    { mes: 2, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 2, jugador: "Mois", resultado: "V", goles: 2 },
    { mes: 2, jugador: "Seba", resultado: "V", goles: 1 },
    
    { mes: 2, jugador: "Isra", resultado: "V", goles: 1 },
    { mes: 2, jugador: "Mois", resultado: "V", goles: 1 },
    { mes: 2, jugador: "Seba", resultado: "V", goles: 1 },
    
    // Partidos de Marzo
    { mes: 3, jugador: "Isra", resultado: "V", goles: 1 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 1 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 3 },
    
    { mes: 3, jugador: "Mois", resultado: "V", goles: 3 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 5 },
    
    { mes: 3, jugador: "Isra", resultado: "V", goles: 2 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 2 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 4 },
    
    { mes: 3, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 3 },

    { mes: 3, jugador: "Isra", resultado: "V", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 3 },
    
    { mes: 3, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 2 },

    { mes: 3, jugador: "Mois", resultado: "V", goles: 4 },
    { mes: 3, jugador: "Seba", resultado: "D", goles: 5 },

    { mes: 3, jugador: "Mois", resultado: "E", goles: 0 },
    { mes: 3, jugador: "Seba", resultado: "E", goles: 4 },

    { mes: 3, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 0 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 2 },
    
    { mes: 3, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 0 },

    { mes: 3, jugador: "Isra", resultado: "D", goles: 0 },
    { mes: 3, jugador: "Mois", resultado: "V", goles: 2 },
    { mes: 3, jugador: "Seba", resultado: "V", goles: 2 },
    
];

const jugadores = ["Isra", "Mois", "Seba"]; // Tus amigos