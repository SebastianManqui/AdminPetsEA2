// src/pages/admin/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../data/dataService';
import '../../App.css';

function Admin() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('dashboard');
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const prods = getProductos();
    setProductos(prods);

    const usrsGuardados = localStorage.getItem('pets_usuarios');
    if (usrsGuardados) {
      setUsuarios(JSON.parse(usrsGuardados));
    } else {
      const usrsIniciales = [
        { run: '19011022K', nombre: 'Juan', apellidos: 'Pérez', correo: 'juan.perez@duoc.cl', rol: 'Administrador' },
        { run: '182223334', nombre: 'María', apellidos: 'González', correo: 'maria.g@gmail.com', rol: 'Cliente' }
      ];
      localStorage.setItem('pets_usuarios', JSON.stringify(usrsIniciales));
      setUsuarios(usrsIniciales);
    }
  }, []);

  const categoriasResumen = Array.from(new Set(productos.map(p => p.categoria || 'Sin Categoría'))).map(catName => {
    const total = productos.filter(p => p.categoria === catName).length;
    return { nombre: catName, cantidad: total };
  });

  return (
    <div>
      <header className="admin-top-bar">
        PETS Admin Panel
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <ul className="sidebar-nav">
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'dashboard' ? 'active' : ''}`}
                onClick={() => setTabActiva('dashboard')}
              >
                Pets
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'productos' ? 'active' : ''}`}
                onClick={() => setTabActiva('productos')}
              >
                Productos
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'categorias' ? 'active' : ''}`}
                onClick={() => setTabActiva('categorias')}
              >
                Categorias
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'usuarios' ? 'active' : ''}`}
                onClick={() => setTabActiva('usuarios')}
              >
                 Usuarios
              </button>
            </li>
            <li>
              <button className="sidebar-nav-item" onClick={() => alert('Reporte En Proceso')}>
                 Reportes
              </button>
            </li>
            <li>
              <button className="sidebar-nav-item" onClick={() => alert('Perfil en Desarrollo')}>
                 Perfil
              </button>
            </li>
          </ul>

          <div className="sidebar-footer-actions">
            <button className="btn-sidebar-store" onClick={() => navigate('/')}>
              Tienda
            </button>
            <button className="btn-sidebar-logout" onClick={() => navigate('/')}>
              Cerrar Sesion
            </button>
          </div>
        </aside>

        <main className="admin-main">
          
          {tabActiva === 'dashboard' && (
            <div>
              <div className="page-header">
                <h1>Dashboard</h1>
                <p>Resumen de las actividades</p>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card blue">
                  <div>
                    <div className="kpi-title">Compras</div>
                    <div className="kpi-value">100</div>
                    <div className="kpi-subtext">Probabilidad de aumento: 20%</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>🛒</div>
                </div>

                <div className="kpi-card green">
                  <div>
                    <div className="kpi-title">Productos</div>
                    <div className="kpi-value">{productos.length}</div>
                    <div className="kpi-subtext">Inventario actual: {productos.length}</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>📦</div>
                </div>

                <div className="kpi-card yellow">
                  <div>
                    <div className="kpi-title">Usuarios</div>
                    <div className="kpi-value">{usuarios.length}</div>
                    <div className="kpi-subtext">Nuevos usuarios:{usuarios.length}</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>👥</div>
                </div>
              </div>

              <div className="features-grid">
                <div className="feature-card" onClick={() => setTabActiva('dashboard')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>⏲️</div>
                  <div className="feature-title">Dashboard</div>
                  <div className="feature-desc">Vision general de todas las metricas y estadisticas clave del sistema</div>
                </div>

                <div className="feature-card" onClick={() => alert('Sección de Órdenes')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🛒</div>
                  <div className="feature-title">Ordenes</div>
                  <div className="feature-desc">Gestion y seguimiento de todas las ordenes de compra realizadas</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('productos')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>📦</div>
                  <div className="feature-title">Productos</div>
                  <div className="feature-desc">Administrar inventario y detalles de los productos disponibles</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('categorias')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🏷️</div>
                  <div className="feature-title">Categorías</div>
                  <div className="feature-desc">Organizar productos en categorias para facilitar su navegacion</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('usuarios')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>👤</div>
                  <div className="feature-title">Usuarios</div>
                  <div className="feature-desc">Gestion de cuentas de usuario y sus roles dentro del sistema</div>
                </div>

                <div className="feature-card" onClick={() => alert('Sección de Reportes')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>📊</div>
                  <div className="feature-title">Reportes</div>
                  <div className="feature-desc">Generacion de informes detallados sobre las operaciones del sistema</div>
                </div>

                <div className="feature-card" onClick={() => alert('Sección Perfil')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>⚙️</div>
                  <div className="feature-title">Perfil</div>
                  <div className="feature-desc">Administracion de la información personal y configuraciones de cuenta</div>
                </div>

                <div className="feature-card" onClick={() => navigate('/')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🏪</div>
                  <div className="feature-title">Tienda</div>
                  <div className="feature-desc">Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios</div>
                </div>
              </div>
            </div>
          )}

          {tabActiva === 'productos' && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Listado de Productos</h2>
              </div>
              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Categoría</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(p => (
                      <tr key={p.codigo}>
                        <td>
                          <img 
                            src={p.imagen} 
                            alt={p.nombre} 
                            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/50?text=PETS';
                            }}
                          />
                        </td>
                        <td><strong>{p.nombre}</strong></td>
                        <td>${p.precio?.toLocaleString()} CLP</td>
                        <td>{p.categoria}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiva === 'categorias' && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Gestion de Categorias</h2>
              </div>
              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre de la Categoria</th>
                      <th>Total de Productos</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriasResumen.map((cat, idx) => (
                      <tr key={idx}>
                        <td><strong>{cat.nombre}</strong></td>
                        <td>{cat.cantidad} productos registrados</td>
                        <td><span style={{ color: '#198754', fontWeight: 'bold' }}>Activa</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiva === 'usuarios' && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2>Listado de Usuarios</h2>
              </div>
              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>RUN</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.run}>
                        <td><strong>{u.nombre} {u.apellidos}</strong></td>
                        <td>{u.correo}</td>
                        <td>{u.run}</td>
                        <td>{u.rol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Admin;