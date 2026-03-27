//Lista de buses con sus datos y posiciones iniciales
export const buses = [
    {
        id: 1,
        ruta: "SM101 - (Aeropuerto - Santa Rita)",
        conductor: "Carlos Pérez",
        placa: "ABC-123",
        posicion: [11.2055, -74.2265], // Cerca de Ziruma, mitad de ruta
        capacidad: 40,
        estado: "En movimiento",
    },
    {
        id: 2,
        ruta: "SM102 - (Mamatoco - Taganga)",
        conductor: "María Gómez",
        placa: "DEF-456",
        posicion: [11.2605, -74.1830], // En Timayui, tramo intermedio
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 3,
        ruta: "SM103 - (Universitaria - Gaira - Troncal del Caribe)",
        conductor: "Juan Rodríguez",
        placa: "GHI-789",
        posicion: [11.2055, -74.2265], // Zona hotelera (Irotama / Estelar)
        capacidad: 35,
        estado:"En movimiento" ,
    },
    {
        id: 4,
        ruta: "SM104 - (Vía a Minca - La Lucha - Ciudad Equidad)",
        conductor: "Ana Martínez",
        placa: "JKL-012",
        posicion: [11.2055, -74.2265], // Entrada Ciudad Equidad
        capacidad: 25,
        estado: "En movimiento",
    },
    {
        id: 5,
        ruta: "SM105 - (Calle 19 - La Lucha - Av del Ferrocarril)",
        conductor: "Luis Fernández",
        placa: "MNO-345",
        posicion: [11.2605, -74.1830], // Sector La Lucha, cerca de Gaira
        capacidad: 20,
        estado:"En movimiento" ,
    },
    {
        id: 6,
        ruta: "SM106 - (Ruta del Ferrocarril - La Lucha - Av del Ferrocarril)",
        conductor: "Pedro Gómez",
        placa: "PQR-678",
        posicion: [11.2150, -74.2300], // Terminal de La Lucha
        capacidad: 25,
        estado: "En movimiento",
    },
    { 
        id: 7,
        ruta: "SM107 - (Bahía Concha - Gaira)",
        conductor: "Carolina Díaz",
        placa: "STU-901",
        posicion: [11.2055, -74.2265], // Terminal de Gaira
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 8,
        ruta: "SM108 - (El Parque - La Lucha)",
        conductor: "José Ramírez",
        placa: "VWX-567",
        posicion: [11.2150, -74.2300], // Terminal La Lucha
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 9,
        ruta: "SM109 - (San Pablo - Timayui)",
        conductor: "Marcos López",
        placa: "YZA-678",
        posicion: [11.2150, -74.2300], // Terminal Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 10,
        ruta: "SM110 - (Libertador - Curval)",
        conductor: "Laura Torres",
        placa: "BCD-901",
        posicion: [11.2150, -74.2300], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 11,
        ruta: "SM111 - (20 de Julio - Nacho Vives)",
        conductor: "José Ramírez",
        placa: "EFG-567",
        posicion: [11.2150, -74.2300], // Terminal de La Lucha
        capacidad: 25,
        estado: "En movimiento",
    },
    {
        id: 12,
        ruta: "SM112 - (La 30 - Pantano - María Eugenia)",
        conductor: "Fernando López",
        placa: "HIJ-678",
        posicion: [11.2480, -74.1880], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 13,
        ruta: "SM113 - (Chimila - Mamatoco – Av del Río)",
        conductor: "Sofía Martínez",
        placa: "KLM-345",
        posicion: [11.2480, -74.1880], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 14,
        ruta: "SM114 - (Gaira – Arrecife)",
        conductor: "Sofía Ramírez",
        placa: "PQR-567",
        posicion: [11.2055, -74.2265], // Terminal de la Lucha
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 15,
        ruta: "SM115 - (Rodrigo Galván de Bastidas – Chimila)",
        conductor: "Fernando Castillo",
        placa: "STU-678",
        posicion: [11.2055, -74.2265], // Terminal de la Lucha
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 16,
        ruta: "SM116 - Pozos Colorados (Zona Hotelera, Don Jaca)",
        conductor: "Luis Ramírez",
        placa: "POZ-123",
        posicion: [11.2475, -74.1990], // Terminal de Gaira
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 17,
        ruta: "SM117 - Estudiantes (11 de Noviembre – Santa Rita)",
        conductor: "Carolina Pacheco",
        placa: "EST-456",
        posicion: [11.2480, -74.1985], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 18,
        ruta: "SM118 - Camellón de la Bahía (La Paz – Centro)",
        conductor: "Andrés Martínez",
        placa: "CBH-789",
        posicion: [11.2380, -74.1810], // Terminal de Gaira
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 19,
        ruta: "SM119 - Ciudad Equidad (Ciudad Equidad – Centro)",
        conductor: "Juan Pérez",
        placa: "CEQ-789",
        posicion: [11.2150, -74.2300], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 20,
        ruta: "SM120 - Rodadero (Rodadero Centro – Rodadero Sur)",
        conductor: "María Gómez",
        placa: "ROD-123",
        posicion: [11.2055, -74.2265], // Terminal de La Lucha
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 21,
        ruta: "SM121 - Ruta del rio (Santa Marta – Ciénaga)",
        conductor: "Carlos Rodríguez",
        placa: "RDR-456",
        posicion: [11.2150, -74.2300], // Terminal de Mamatoco
        capacidad: 30,
        estado: "En movimiento",
    },
    {
        id: 22,
        ruta: "SM122 - Universidad Del Magdalena (Universidad del Magdalena – Las Malvinas)",
        conductor: "Ana Gómez",
        placa: "UDM-789",
        posicion: [11.2055, -74.2265], // Terminal de La Lucha
        capacidad: 30,
        estado: "En movimiento",
    }    
]