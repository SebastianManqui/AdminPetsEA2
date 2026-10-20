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
  const [ordenes, setOrdenes] = useState([]);
  
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);
  const [historialUsuario, setHistorialUsuario] = useState(null);
  
  const [formProducto, setFormProducto] = useState(null); 
  const [formCategoria, setFormCategoria] = useState(null);
  const [formUsuario, setFormUsuario] = useState(null);

  const [perfilAdmin, setPerfilAdmin] = useState({
    nombre: 'Admin PETS',
    correo: 'admin@pets.cl',
    rol: 'Super Administrador'
  });

  useEffect(() => {
    const prodsData = getProductos().map(p => ({
      ...p,
      stock: p.stock !== undefined ? p.stock : Math.floor(Math.random() * 15) + 1 
    }));
    setProductos(prodsData);

    const usrsGuardados = localStorage.getItem('pets_usuarios');
    if (usrsGuardados) {
      setUsuarios(JSON.parse(usrsGuardados));
    } else {
      const usrsIniciales = [
        { run: '19011022K', nombre: 'Juan', apellidos: 'Pérez', correo: 'juan.perez@duoc.cl', rol: 'Administrador' },
        { run: '182223334', nombre: 'Maria', apellidos: 'Gonzalez', correo: 'maria.g@gmail.com', rol: 'Cliente' }
      ];
      localStorage.setItem('pets_usuarios', JSON.stringify(usrsIniciales));
      setUsuarios(usrsIniciales);
    }

    const ordenesIniciales = [
      {
        id: 'BOL-1001',
        cliente: 'Maria Gonzalez',
        run: '182223334',
        fecha: '2026-10-18',
        total: 25990,
        estado: 'Completada',
        items: [{ nombre: 'Alimento Perro Adulto 15kg', cant: 1, precio: 25000 }]
      },
      {
        id: 'BOL-1002',
        cliente: 'Juan Pérez',
        run: '19011022K',
        fecha: '2026-10-19',
        total: 12500,
        estado: 'En Proceso',
        items: [{ nombre: 'Cama para mascotas', cant: 1, precio: 19.990}]
      }
    ];
    setOrdenes(ordenesIniciales);
  }, []);

  const categoriasResumen = Array.from(new Set(productos.map(p => p.categoria || 'Sin Categoría'))).map(catName => {
    const total = productos.filter(p => p.categoria === catName).length;
    return { nombre: catName, cantidad: total };
  });

  const productosCriticos = productos.filter(p => (p.stock || 0) <= 5);

  const guardarProducto = (e) => {
    e.preventDefault();
    if (formProducto.modo === 'crear') {
      const nuevo = { ...formProducto.datos, codigo: Date.now() };
      setProductos([...productos, nuevo]);
    } else {
      setProductos(productos.map(p => p.codigo === formProducto.datos.codigo ? formProducto.datos : p));
    }
    setFormProducto(null);
  };

  const guardarCategoria = (e) => {
    e.preventDefault();
    setFormCategoria(null);
    alert('Categoria guardada correctamente');
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    let listaActualizada;
    if (formUsuario.modo === 'crear') {
      listaActualizada = [...usuarios, formUsuario.datos];
    } else {
      listaActualizada = usuarios.map(u => u.run === formUsuario.datos.run ? formUsuario.datos : u);
    }
    setUsuarios(listaActualizada);
    localStorage.setItem('pets_usuarios', JSON.stringify(listaActualizada));
    setFormUsuario(null);
  };

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
                Dashboard
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'ordenes' ? 'active' : ''}`}
                onClick={() => setTabActiva('ordenes')}
              >
                Ordenes / Boletas
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'productos' || tabActiva === 'criticos' ? 'active' : ''}`}
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
                Categorías
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
              <button 
                className={`sidebar-nav-item ${tabActiva === 'reportes' ? 'active' : ''}`}
                onClick={() => setTabActiva('reportes')}
              >
                Reportes
              </button>
            </li>
            <li>
              <button 
                className={`sidebar-nav-item ${tabActiva === 'perfil' ? 'active' : ''}`}
                onClick={() => setTabActiva('perfil')}
              >
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
                <p>Resumen general de las actividades y estado del sistema</p>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card blue" onClick={() => setTabActiva('ordenes')} style={{ cursor: 'pointer' }}>
                  <div>
                    <div className="kpi-title">Compras / Ordenes</div>
                    <div className="kpi-value">{ordenes.length}</div>
                    <div className="kpi-subtext">Ordenes registradas</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>🛒</div>
                </div>

                <div className="kpi-card green" onClick={() => setTabActiva('productos')} style={{ cursor: 'pointer' }}>
                  <div>
                    <div className="kpi-title">Productos</div>
                    <div className="kpi-value">{productos.length}</div>
                    <div className="kpi-subtext">Stock Critico: {productosCriticos.length}</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>📦</div>
                </div>

                <div className="kpi-card yellow" onClick={() => setTabActiva('usuarios')} style={{ cursor: 'pointer' }}>
                  <div>
                    <div className="kpi-title">Usuarios</div>
                    <div className="kpi-value">{usuarios.length}</div>
                    <div className="kpi-subtext">Usuarios activos</div>
                  </div>
                  <div style={{ fontSize: '36px' }}>👥</div>
                </div>
              </div>

              <div className="features-grid">
                <div className="feature-card" onClick={() => setTabActiva('ordenes')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🧾</div>
                  <div className="feature-title">Ordenes / Boletas</div>
                  <div className="feature-desc">Ver boletas emitidas y detalle de compras</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('productos')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>📦</div>
                  <div className="feature-title">Productos</div>
                  <div className="feature-desc">Crear, editar e inventario general</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('criticos')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>⚠️</div>
                  <div className="feature-title">Productos Criticos</div>
                  <div className="feature-desc">Listado de productos con bajo stock</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('categorias')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>🏷️</div>
                  <div className="feature-title">Categorias</div>
                  <div className="feature-desc">Mantenimiento de categorias del sistema</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('usuarios')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>👤</div>
                  <div className="feature-title">Usuarios</div>
                  <div className="feature-desc">Gestion de usuarios e historial de compras</div>
                </div>

                <div className="feature-card" onClick={() => setTabActiva('reportes')}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>📊</div>
                  <div className="feature-title">Reportes</div>
                  <div className="feature-desc">Informes del sistema</div>
                </div>
              </div>
            </div>
          )}

          {tabActiva === 'ordenes' && (
            <div className="card-table-container">
              <h2>Ordenes y Boletas</h2>
              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>N° Boleta</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordenes.map(o => (
                      <tr key={o.id}>
                        <td><strong>{o.id}</strong></td>
                        <td>{o.cliente}</td>
                        <td>{o.fecha}</td>
                        <td>${o.total.toLocaleString()} CLP</td>
                        <td><span className="badge bg-success">{o.estado}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary" onClick={() => setBoletaSeleccionada(o)}>
                            Ver Boleta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(tabActiva === 'productos' || tabActiva === 'criticos') && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>{tabActiva === 'criticos' ? ' Productos con Stock Crítico' : 'Gestion de Productos'}</h2>
                <div>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2" 
                    onClick={() => setTabActiva(tabActiva === 'criticos' ? 'productos' : 'criticos')}
                  >
                    {tabActiva === 'criticos' ? 'Ver Todos los Productos' : 'Ver Stock Crítico'}
                  </button>
                  <button 
                    className="btn btn-sm btn-primary" 
                    onClick={() => setFormProducto({ modo: 'crear', datos: { nombre: '', precio: 0, categoria: 'Perros', stock: 10, imagen: '' } })}
                  >
                    + Nuevo Producto
                  </button>
                </div>
              </div>

              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Categoria</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(tabActiva === 'criticos' ? productosCriticos : productos).map(p => (
                      <tr key={p.codigo}>
                        <td>
                          <img 
                            src={p.imagen} 
                            alt={p.nombre} 
                            style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50?text=PETS'; }}
                          />
                        </td>
                        <td><strong>{p.nombre}</strong></td>
                        <td>${p.precio?.toLocaleString()} CLP</td>
                        <td>{p.categoria}</td>
                        <td>
                          <span className={`badge ${p.stock <= 5 ? 'bg-danger' : 'bg-success'}`}>
                            {p.stock} un.
                          </span>
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning text-white" 
                            onClick={() => setFormProducto({ modo: 'editar', datos: { ...p } })}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiva === 'categorias' && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Gestión de Categorias</h2>
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={() => setFormCategoria({ modo: 'crear', datos: { nombre: '' } })}
                >
                  + Nueva Categoria
                </button>
              </div>

              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre de Categoria</th>
                      <th>Total Productos</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriasResumen.map((cat, idx) => (
                      <tr key={idx}>
                        <td><strong>{cat.nombre}</strong></td>
                        <td>{cat.cantidad} productos registrados</td>
                        <td><span style={{ color: '#198754', fontWeight: 'bold' }}>Activa</span></td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning text-white" 
                            onClick={() => setFormCategoria({ modo: 'editar', datos: { nombre: cat.nombre } })}
                          >
                            Editar Categoría
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiva === 'usuarios' && (
            <div className="card-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2>Listado de Usuarios</h2>
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={() => setFormUsuario({ modo: 'crear', datos: { run: '', nombre: '', apellidos: '', correo: '', rol: 'Cliente' } })}
                >
                  + Nuevo Usuario
                </button>
              </div>

              <div className="tabla-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>RUN</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map(u => (
                      <tr key={u.run}>
                        <td><strong>{u.nombre} {u.apellidos}</strong></td>
                        <td>{u.correo}</td>
                        <td>{u.run}</td>
                        <td>{u.rol}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-warning text-white me-2" 
                            onClick={() => setFormUsuario({ modo: 'editar', datos: { ...u } })}
                          >
                            Editar
                          </button>
                          <button 
                            className="btn btn-sm btn-info text-white" 
                            onClick={() => setHistorialUsuario(u)}
                          >
                            Historial Compras
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tabActiva === 'reportes' && (
            <div className="card-table-container">
              <h2>Modulo de Reportes de Gestion</h2>
              <p className="text-muted">Estadisticas sobre las ventas</p>
              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <div className="p-3 border rounded bg-light">
                    <h5> Ventas Totales del Mes</h5>
                    <p className="fs-4 text-success fw-bold">$38,490 CLP</p>
                    <small>Generado automaticamente desde ordenes completadas</small>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border rounded bg-light">
                    <h5>Resumen de Inventario</h5>
                    <p className="mb-1">Total de productos: <strong>{productos.length}</strong></p>
                    <p className="mb-0 text-danger">Productos en nivel critico: <strong>{productosCriticos.length}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tabActiva === 'perfil' && (
            <div className="card-table-container" style={{ maxWidth: '600px' }}>
              <h2>Perfil del Administrador</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Perfil actualizado'); }}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" value={perfilAdmin.nombre} onChange={(e) => setPerfilAdmin({...perfilAdmin, nombre: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo Electronico</label>
                  <input className="form-control" value={perfilAdmin.correo} onChange={(e) => setPerfilAdmin({...perfilAdmin, correo: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol</label>
                  <input className="form-control" value={perfilAdmin.rol} disabled />
                </div>
                <button type="submit" className="btn btn-success">Guardar Cambios</button>
              </form>
            </div>
          )}

          {boletaSeleccionada && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Detalle de Boleta: {boletaSeleccionada.id}</h5>
                    <button type="button" className="btn-close" onClick={() => setBoletaSeleccionada(null)}></button>
                  </div>
                  <div className="modal-body">
                    <p><strong>Cliente:</strong> {boletaSeleccionada.cliente}</p>
                    <p><strong>RUN:</strong> {boletaSeleccionada.run}</p>
                    <p><strong>Fecha:</strong> {boletaSeleccionada.fecha}</p>
                    <hr />
                    <h6>Items Comprados:</h6>
                    <ul>
                      {boletaSeleccionada.items.map((it, i) => (
                        <li key={i}>{it.cant}x {it.nombre} - ${it.precio.toLocaleString()} CLP</li>
                      ))}
                    </ul>
                    <h5 className="text-end mt-3">Total: ${boletaSeleccionada.total.toLocaleString()} CLP</h5>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setBoletaSeleccionada(null)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {historialUsuario && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Historial de Compras: {historialUsuario.nombre}</h5>
                    <button type="button" className="btn-close" onClick={() => setHistorialUsuario(null)}></button>
                  </div>
                  <div className="modal-body">
                    {ordenes.filter(o => o.run === historialUsuario.run).length > 0 ? (
                      ordenes.filter(o => o.run === historialUsuario.run).map(o => (
                        <div key={o.id} className="border p-2 mb-2 rounded">
                          <strong>Boleta {o.id}</strong> - {o.fecha}<br />
                          Total: ${o.total.toLocaleString()} CLP ({o.estado})
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">Este usuario no registra compras anteriormente</p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setHistorialUsuario(null)}>Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {formProducto && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={guardarProducto}>
                    <div className="modal-header">
                      <h5 className="modal-title">{formProducto.modo === 'crear' ? 'Nuevo Producto' : 'Editar Producto'}</h5>
                      <button type="button" className="btn-close" onClick={() => setFormProducto(null)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>Nombre</label>
                        <input className="form-control" required value={formProducto.datos.nombre} onChange={(e) => setFormProducto({...formProducto, datos: {...formProducto.datos, nombre: e.target.value}})} />
                      </div>
                      <div className="mb-2">
                        <label>Precio (CLP)</label>
                        <input type="number" className="form-control" required value={formProducto.datos.precio} onChange={(e) => setFormProducto({...formProducto, datos: {...formProducto.datos, precio: Number(e.target.value)}})} />
                      </div>
                      <div className="mb-2">
                        <label>Stock</label>
                        <input type="number" className="form-control" required value={formProducto.datos.stock} onChange={(e) => setFormProducto({...formProducto, datos: {...formProducto.datos, stock: Number(e.target.value)}})} />
                      </div>
                      <div className="mb-2">
                        <label>Categoria</label>
                        <input className="form-control" required value={formProducto.datos.categoria} onChange={(e) => setFormProducto({...formProducto, datos: {...formProducto.datos, categoria: e.target.value}})} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setFormProducto(null)}>Cancelar</button>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {formCategoria && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={guardarCategoria}>
                    <div className="modal-header">
                      <h5 className="modal-title">{formCategoria.modo === 'crear' ? 'Nueva Categoría' : 'Editar Categoría'}</h5>
                      <button type="button" className="btn-close" onClick={() => setFormCategoria(null)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>Nombre de Categoria</label>
                        <input className="form-control" required value={formCategoria.datos.nombre} onChange={(e) => setFormCategoria({...formCategoria, datos: {...formCategoria.datos, nombre: e.target.value}})} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setFormCategoria(null)}>Cancelar</button>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {formUsuario && (
            <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={guardarUsuario}>
                    <div className="modal-header">
                      <h5 className="modal-title">{formUsuario.modo === 'crear' ? 'Nuevo Usuario' : 'Editar Usuario'}</h5>
                      <button type="button" className="btn-close" onClick={() => setFormUsuario(null)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-2">
                        <label>RUT</label>
                        <input className="form-control" required disabled={formUsuario.modo === 'editar'} value={formUsuario.datos.run} onChange={(e) => setFormUsuario({...formUsuario, datos: {...formUsuario.datos, run: e.target.value}})} />
                      </div>
                      <div className="mb-2">
                        <label>Nombre</label>
                        <input className="form-control" required value={formUsuario.datos.nombre} onChange={(e) => setFormUsuario({...formUsuario, datos: {...formUsuario.datos, nombre: e.target.value}})} />
                      </div>
                      <div className="mb-2">
                        <label>Correo</label>
                        <input type="email" className="form-control" required value={formUsuario.datos.correo} onChange={(e) => setFormUsuario({...formUsuario, datos: {...formUsuario.datos, correo: e.target.value}})} />
                      </div>
                      <div className="mb-2">
                        <label>Rol</label>
                        <select className="form-select" value={formUsuario.datos.rol} onChange={(e) => setFormUsuario({...formUsuario, datos: {...formUsuario.datos, rol: e.target.value}})}>
                          <option value="Cliente">Cliente</option>
                          <option value="Administrador">Administrador</option>
                        </select>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setFormUsuario(null)}>Cancelar</button>
                      <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Admin;