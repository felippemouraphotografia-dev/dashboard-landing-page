/* --- RESET E ESTILOS GERAIS --- */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

body {
    background-color: #0b0d14;
    color: #e2e8f0;
    min-height: 100vh;
}

.app-container {
    display: flex;
    min-height: 100vh;
}

/* --- SIDEBAR --- */
.sidebar {
    width: 240px;
    background-color: #121520;
    border-right: 1px solid #1e2235;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.sidebar h2 {
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 600;
    letter-spacing: 0.5px;
}

.nav-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.nav-title {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #475569;
    margin-bottom: 6px;
}

.sidebar a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.2s ease;
}

.sidebar a:hover, .sidebar a.active {
    background: linear-gradient(135deg, #7c3aed, #ec4899);
    color: #ffffff;
}

/* --- CONTEÚDO PRINCIPAL --- */
.main-content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
}

header h1 {
    font-size: 1.8rem;
    color: #ffffff;
    font-weight: 600;
}

header p {
    color: #64748b;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
}

#refresh-btn {
    background: linear-gradient(135deg, #7c3aed, #ec4899);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
    transition: opacity 0.2s;
}

#refresh-btn:hover { opacity: 0.9; }
#refresh-btn:disabled { opacity: 0.6; cursor: wait; }

/* --- GRID DE CARTÕES --- */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
}

.card {
    background-color: #16192b;
    border: 1px solid #232842;
    border-radius: 16px;
    padding: 24px;
    position: relative;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    border-color: #7c3aed;
}

.card h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8b93ad;
    margin-bottom: 12px;
}

.card .value {
    font-size: 2.2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 8px;
}

.card .desc {
    font-size: 0.85rem;
    color: #06b6d4;
}

.card .status-up { color: #22c55e; }
.card .status-stable { color: #94a3b8; }

/* Cartões com gradiente */
.card.gradient-purple {
    background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%);
    border: none;
}

.card.gradient-cyan {
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border: none;
}

.card.gradient-purple h3, .card.gradient-purple .value, .card.gradient-purple .desc,
.card.gradient-cyan h3, .card.gradient-cyan .value, .card.gradient-cyan .desc {
    color: #ffffff;
}

.card.gradient-purple .desc, .card.gradient-cyan .desc {
    opacity: 0.9;
}

/* --- SEÇÃO INFERIOR --- */
.wide-card {
    background-color: #16192b;
    border: 1px solid #232842;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
}

.wide-card h3 {
    font-size: 0.9rem;
    color: #ffffff;
    margin-bottom: 15px;
}

.chart-placeholder {
    color: #64748b;
    font-size: 0.9rem;
    padding: 20px 0;
    text-align: center;
}

#trafficChart {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: 10px;
}

/* --- RESPONSIVO --- */
@media (max-width: 768px) {
    .app-container { flex-direction: column; }
    .sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #1e2235;
        padding: 20px;
    }
    .main-content { padding: 20px; }
    header { flex-direction: column; align-items: flex-start; gap: 15px; }
}
/* Ajustes para o HTML semântico */
.nav-section ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sidebar a { display: block; }

.nav-title { font-weight: 400; }

hgroup p { margin: 4px 0 0; }

figure { margin: 0; }
