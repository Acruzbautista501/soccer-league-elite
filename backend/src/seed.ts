import mongoose from 'mongoose';
import { Team } from './models/Team.js';

const seedData = [
  {
    name: 'Deportivo Amatlán',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#E63946',
    logoUrl: 'https://placehold.co/200x200/amatlan.png',
    coach: 'Luis Hernández',
    contactEmail: 'luis.hernandez@amatlanfc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético Ojital',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#1D3557',
    logoUrl: 'https://placehold.co/200x200/ojital.png',
    coach: 'Miguel Cruz',
    contactEmail: 'miguel.cruz@ojitalfc.mx',
    status: 'Activo'
  },
  {
    name: 'Real Naranjos',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#F4A261',
    logoUrl: 'https://placehold.co/200x200/realnaranjos.png',
    coach: 'Eduardo Salas',
    contactEmail: 'eduardo.salas@realnaranjos.mx',
    status: 'Activo'
  },
  {
    name: 'Guerreros de Ocampo',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#2A9D8F',
    logoUrl: 'https://placehold.co/200x200/guerreros.png',
    coach: 'Antonio Pérez',
    contactEmail: 'antonio.perez@guerrerosocampo.mx',
    status: 'Activo'
  },
  {
    name: 'Juventus Colonia Americana',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#000000',
    logoUrl: 'https://placehold.co/200x200/juventus.png',
    coach: 'Jorge Torres',
    contactEmail: 'jorge.torres@juventusamericana.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo Flores Magón',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#F1C40F',
    logoUrl: 'https://placehold.co/200x200/floresmagon.png',
    coach: 'Gerardo Azuara',
    contactEmail: 'gerardo.azuara@floresmagonfc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo 18 de Marzo',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#8D0801',
    logoUrl: 'https://placehold.co/200x200/18marzo.png',
    coach: 'Fernando López',
    contactEmail: 'fernando.lopez@18marzofc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético Tancoco',
    city: 'Tancoco',
    region: 'Zona Golfo',
    primaryColor: '#264653',
    logoUrl: 'https://placehold.co/200x200/tancoco.png',
    coach: 'Ricardo Vargas',
    contactEmail: 'ricardo.vargas@tancocofc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo Tamiahua',
    city: 'Tamiahua',
    region: 'Zona Golfo',
    primaryColor: '#3A86FF',
    logoUrl: 'https://placehold.co/200x200/tamiahua.png',
    coach: 'Jesús Martínez',
    contactEmail: 'jesus.martinez@tamiahua.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético Naranjos',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#0F172A',
    logoUrl: 'https://example.com/logos/atletico-naranjos.png',
    coach: 'Francisco Domínguez',
    contactEmail: 'francisco.dominguez@atleticonaranjosfc.com',
    status: 'Activo'
  },
  {
    name: 'Atlético Rancho Nuevo',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#FF006E',
    logoUrl: 'https://placehold.co/200x200/ranchonuevo.png',
    coach: 'Sergio Ramírez',
    contactEmail: 'sergio.ramirez@ranchonuevofc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo Ojite',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#06D6A0',
    logoUrl: 'https://placehold.co/200x200/ojite.png',
    coach: 'Pedro Castillo',
    contactEmail: 'pedro.castillo@ojitefc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético El Cafetal',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#8E44AD',
    logoUrl: 'https://placehold.co/200x200/cafetal.png',
    coach: 'Raúl Jiménez',
    contactEmail: 'raul.jimenez@cafetalfc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo El Volador',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#2B2D42',
    logoUrl: 'https://placehold.co/200x200/volador.png',
    coach: 'Gabriel Flores',
    contactEmail: 'gabriel.flores@voladorfc.mx',
    status: 'Activo'
  },
  {
    name: 'Halcones de Amatlán',
    city: 'Naranjos Amatlán',
    region: 'Zona Golfo',
    primaryColor: '#E76F51',
    logoUrl: 'https://placehold.co/200x200/halcones.png',
    coach: 'Héctor Medina',
    contactEmail: 'hector.medina@halconesamatlan.mx',
    status: 'Activo'
  },
  {
    name: 'Real Tantima',
    city: 'Tantima',
    region: 'Zona Norte',
    primaryColor: '#E63946',
    logoUrl: 'https://placehold.co/200x200/real-tantima.png',
    coach: 'Luis Antonio Cruz',
    contactEmail: 'luis.cruz@tantimafc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo Tamalín',
    city: 'Tamalín',
    region: 'Zona Norte',
    primaryColor: '#2A9D8F',
    logoUrl: 'https://placehold.co/200x200/deportivo-tamalin.png',
    coach: 'José Manuel García',
    contactEmail: 'jose.garcia@tamalinfc.mx',
    status: 'Activo'
  },
  {
    name: 'Halcones de Chontla',
    city: 'Chontla',
    region: 'Zona Norte',
    primaryColor: '#264653',
    logoUrl: 'https://placehold.co/200x200/halcones-chontla.png',
    coach: 'Mario López',
    contactEmail: 'mario.lopez@halconeschontla.mx',
    status: 'Activo'
  },
  {
    name: 'Guerreros de Otontepec',
    city: 'Chontla',
    region: 'Zona Norte',
    primaryColor: '#8E44AD',
    logoUrl: 'https://placehold.co/200x200/guerreros-otontepec.png',
    coach: 'Ricardo Castillo',
    contactEmail: 'ricardo.castillo@otontepecfc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo Kilómetro 22',
    city: 'Tamalín',
    region: 'Zona Norte',
    primaryColor: '#F4A261',
    logoUrl: 'https://placehold.co/200x200/km22.png',
    coach: 'Alberto Mendoza',
    contactEmail: 'alberto.mendoza@km22fc.mx',
    status: 'Activo'
  },
  {
    name: 'Juventus El Coyol',
    city: 'Chinampa de Gorostiza',
    region: 'Zona Norte',
    primaryColor: '#000000',
    logoUrl: 'https://placehold.co/200x200/juventus-coyol.png',
    coach: 'Pedro Ramírez',
    contactEmail: 'pedro.ramirez@coyolfc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético San Sebastián',
    city: 'Tantima',
    region: 'Zona Norte',
    primaryColor: '#06D6A0',
    logoUrl: 'https://placehold.co/200x200/sansebastian.png',
    coach: 'Jesús Morales',
    contactEmail: 'jesus.morales@sansebastianfc.mx',
    status: 'Activo'
  },
  {
    name: 'Real El Chote',
    city: 'Chontla',
    region: 'Zona Norte',
    primaryColor: '#FF006E',
    logoUrl: 'https://placehold.co/200x200/elchote.png',
    coach: 'Héctor Flores',
    contactEmail: 'hector.flores@elchotefc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo La Garita',
    city: 'Chinampa de Gorostiza',
    region: 'Zona Norte',
    primaryColor: '#3A86FF',
    logoUrl: 'https://placehold.co/200x200/lagarita.png',
    coach: 'Fernando Pérez',
    contactEmail: 'fernando.perez@lagaritafc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético Pimienta',
    city: 'Tamalín',
    region: 'Zona Norte',
    primaryColor: '#2B2D42',
    logoUrl: 'https://placehold.co/200x200/pimienta.png',
    coach: 'Daniel Vargas',
    contactEmail: 'daniel.vargas@pimientafc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo El Mirador',
    city: 'Tantima',
    region: 'Zona Norte',
    primaryColor: '#E76F51',
    logoUrl: 'https://placehold.co/200x200/mirador.png',
    coach: 'Gabriel Torres',
    contactEmail: 'gabriel.torres@miradorfc.mx',
    status: 'Activo'
  },
  {
    name: 'Halcones de Tamalín',
    city: 'Tamalín',
    region: 'Zona Norte',
    primaryColor: '#118AB2',
    logoUrl: 'https://placehold.co/200x200/halcones-tamalin.png',
    coach: 'Raúl Medina',
    contactEmail: 'raul.medina@halconestamalin.mx',
    status: 'Activo'
  },
  {
    name: 'Real San Pedro',
    city: 'Chinampa de Gorostiza',
    region: 'Zona Norte',
    primaryColor: '#8338EC',
    logoUrl: 'https://placehold.co/200x200/sanpedro.png',
    coach: 'Carlos Ortega',
    contactEmail: 'carlos.ortega@sanpedrofc.mx',
    status: 'Activo'
  },
  {
    name: 'Deportivo La Esperanza',
    city: 'Chontla',
    region: 'Zona Norte',
    primaryColor: '#EF476F',
    logoUrl: 'https://placehold.co/200x200/esperanza.png',
    coach: 'Javier Cruz',
    contactEmail: 'javier.cruz@esperanzafc.mx',
    status: 'Activo'
  },
  {
    name: 'Atlético La Florida',
    city: 'Tantima',
    region: 'Zona Norte',
    primaryColor: '#073B4C',
    logoUrl: 'https://placehold.co/200x200/florida.png',
    coach: 'Miguel Salinas',
    contactEmail: 'miguel.salinas@floridafc.mx',
    status: 'Activo'
  }  
];

const runSeed = async () => {
  try {
    // Ajusta la URI si es necesario
    await mongoose.connect('mongodb://localhost:27017/liga-elite');
    console.log('Conectado a MongoDB para hacer el Seed...');

    await Team.deleteMany({}); // Limpia la colección para evitar duplicados
    await Team.insertMany(seedData);
    
    console.log('¡Base de datos poblada con éxito!');
    process.exit();
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
};

runSeed();