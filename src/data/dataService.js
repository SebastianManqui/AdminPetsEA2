// src/data/dataService.js

export const productosIniciales = [
  { codigo: 'C1-1', nombre: 'Fit Formula', precio: 35000, stock: 10, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/a.jpg', descripcion: 'Alimento completo para perros.' },
  { codigo: 'C1-2', nombre: 'Doko', precio: 18000, stock: 12, stockCritico: 3, categoria: 'Alimentos', imagen: '/img/a1.jpg', descripcion: 'Alimento balanceado.' },
  { codigo: 'C1-3', nombre: 'Dog Chow', precio: 35000, stock: 15, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/image1.jpg', descripcion: 'Nutrición óptima para perros.' },
  { codigo: 'C1-4', nombre: 'Master Dog', precio: 22000, stock: 8, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/image.jpg', descripcion: 'Alimento para perros adultos.' },
  { codigo: 'C1-5', nombre: 'Guardian', precio: 20000, stock: 10, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/perros2.jpg', descripcion: 'Protección y gran sabor.' },
  { codigo: 'C1-6', nombre: 'Voller', precio: 52000, stock: 5, stockCritico: 1, categoria: 'Alimentos', imagen: '/img/perros3.jpg', descripcion: 'Alimento súper premium.' },
  { codigo: 'C1-7', nombre: 'Champions Dog', precio: 24000, stock: 14, stockCritico: 3, categoria: 'Alimentos', imagen: '/img/perros4.jpg', descripcion: 'Nutrición para campeones.' },
  { codigo: 'C1-8', nombre: 'DogBuffer', precio: 42000, stock: 6, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/perros1.jpg', descripcion: 'Fórmula especial para perros.' },

  { codigo: 'C2-1', nombre: 'Pack De Pelotas', precio: 8500, stock: 20, stockCritico: 4, categoria: 'Accesorios', imagen: '/img/pelotas1.jpg', descripcion: 'Pack de pelotas resistentes.' },
  { codigo: 'C2-2', nombre: 'Juego Pelotas', precio: 10000, stock: 15, stockCritico: 3, categoria: 'Accesorios', imagen: '/img/pelotas2.jpg', descripcion: 'Juego de pelotas variadas.' },
  { codigo: 'C2-3', nombre: 'Raton', precio: 2500, stock: 30, stockCritico: 5, categoria: 'Accesorios', imagen: '/img/raton1.jpg', descripcion: 'Juguete ratón para gatos.' },
  { codigo: 'C2-4', nombre: 'Peluche', precio: 4500, stock: 18, stockCritico: 3, categoria: 'Accesorios', imagen: '/img/juguetes4.jpg', descripcion: 'Peluche suave para mascotas.' },

  { codigo: 'C3-1', nombre: 'Cama 1', precio: 15000, stock: 7, stockCritico: 2, categoria: 'Accesorios', imagen: '/img/cama.jpg', descripcion: 'Cama cómoda para descanso.' },
  { codigo: 'C3-2', nombre: 'Cama 2', precio: 28000, stock: 5, stockCritico: 1, categoria: 'Accesorios', imagen: '/img/cama2.jpg', descripcion: 'Cama acolchada tamaño mediano.' },
  { codigo: 'C3-3', nombre: 'Cama 3', precio: 9500, stock: 10, stockCritico: 2, categoria: 'Accesorios', imagen: '/img/cama3.jpg', descripcion: 'Cama pequeña redonda.' },
  { codigo: 'C3-4', nombre: 'Cama 4', precio: 7000, stock: 12, stockCritico: 2, categoria: 'Accesorios', imagen: '/img/cama4.jpg', descripcion: 'Cama suave y lavable.' },
  { codigo: 'C3-5', nombre: 'Pack de Collares', precio: 15000, stock: 15, stockCritico: 3, categoria: 'Accesorios', imagen: '/img/arnes1.jpg', descripcion: 'Set de collares ajustables.' },
  { codigo: 'C3-6', nombre: 'Arnes Para Perro', precio: 12000, stock: 11, stockCritico: 2, categoria: 'Accesorios', imagen: '/img/arnes2.jpg', descripcion: 'Arnés ergonómico para paseos.' },
  { codigo: 'C3-7', nombre: 'Pack de Collares De Gato', precio: 9500, stock: 14, stockCritico: 3, categoria: 'Accesorios', imagen: '/img/collares1.jpg', descripcion: 'Collares con cascabel para gatos.' },
  { codigo: 'C3-8', nombre: 'Capa Para Perros', precio: 7000, stock: 9, stockCritico: 2, categoria: 'Accesorios', imagen: '/img/capa1.jpg', descripcion: 'Capa de abrigo impermeable.' },

  { codigo: 'C4-1', nombre: 'Nomade Adulto', precio: 22000, stock: 10, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/a3gato.jpg', descripcion: 'Alimento completo para gatos adultos.' },
  { codigo: 'C4-2', nombre: 'Catchow', precio: 25000, stock: 13, stockCritico: 3, categoria: 'Alimentos', imagen: '/img/a4gato.jpg', descripcion: 'Receta deliciosa para felinos.' },
  { codigo: 'C4-3', nombre: 'Bravery Cachorro', precio: 45000, stock: 8, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/a5gato.jpg', descripcion: 'Alimento súper premium para gatitos.' },
  { codigo: 'C4-4', nombre: 'Raza', precio: 15000, stock: 16, stockCritico: 4, categoria: 'Alimentos', imagen: '/img/a6gato.jpg', descripcion: 'Nutrición diaria balanceada.' },
  { codigo: 'C4-5', nombre: 'Gati Adulto', precio: 20000, stock: 12, stockCritico: 3, categoria: 'Alimentos', imagen: '/img/a7gato.jpg', descripcion: 'Sabor irresistible para felinos.' },
  { codigo: 'C4-6', nombre: 'Champions Cat', precio: 27000, stock: 10, stockCritico: 2, categoria: 'Alimentos', imagen: '/img/a8gato.jpg', descripcion: 'Salud y vitalidad para gatos.' }
];

export const getProductos = () => {
  const guardados = localStorage.getItem('pets_productos');
  if (guardados) return JSON.parse(guardados);
  localStorage.setItem('pets_productos', JSON.stringify(productosIniciales));
  return productosIniciales;
};