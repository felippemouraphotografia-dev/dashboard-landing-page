// URL do Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbzCOnC1flDhnRhJ_6bR28aTB62dsbtfo6aoLXTPBsQr7jbPkg_Trd28T9W441pEydPIxg/exec";

const dashboardData = {
  visitas: 0,
  cliquesContato: 0,
  leads: 0,
  historicoTrafego: [0, 0, 0, 0, 0, 0, 0],
  diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
};

const $ = id => document.getElementById(id);

function atualizarInterface() {
  const { visitas, cliquesContato, leads } = dashboardData;
  $('visitas').textContent   = visitas.toLocaleString('pt-BR');
  $('cliques').textContent   = cliquesContato.toLocaleString('pt-BR');
  $('leads').textContent     = leads.toLocaleString('pt-BR');
  $('conversao').textContent = `${visitas > 0 ? ((leads / visitas) * 100).toFixed(1) : 0}%`;
  desenharGrafico();
}

function desenharGrafico() {
  const canvas = $('trafficChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const data = dashboardData.historicoTrafego;
  const labels = dashboardData.diasSemana;
  const padding = 40;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;
  const max = Math.max(...data, 10);
  const stepX = chartW / (data.length - 1);
  const pos = (v, i) => [padding + i * stepX, height - padding - (v / max) * chartH];

  ctx.clearRect(0, 0, width, height);

  // Grade
  ctx.strokeStyle = '#232842';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 3; i++) {
    const y = padding + (chartH / 3) * i;
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
  }
  ctx.stroke();

  // Linha
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 3;
  ctx.beginPath();
  data.forEach((v, i) => {
    const [x, y] = pos(v, i);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Pontos e rótulos
  ctx.font = '12px system-ui';
  ctx.textAlign = 'center';
  data.forEach((v, i) => {
    const [x, y] = pos(v, i);
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(v, x, y - 12);
    ctx.fillStyle = '#64748b';
    ctx.fillText(labels[i] || '', x, height - 10);
  });
}

async function buscarDadosDaPlanilha() {
  const btn = $('refresh-btn');
  const info = $('trafego-info');
  btn.disabled = true;
  btn.textContent = "🔄 A sincronizar...";
  info.textContent = "A sincronizar com a planilha do Google Sheets...";

  try {
    const res = await fetch(`${API_URL}?t=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();

    dashboardData.visitas        = Number(d.visitas) || 0;
    dashboardData.cliquesContato = Number(d.cliquesContato) || 0;
    dashboardData.leads          = Number(d.leads) || 0;
    const hist = d.historicoTrafego || d.historicoTráfego;
    if (Array.isArray(hist) && hist.length) dashboardData.historicoTrafego = hist.map(Number);

    atualizarInterface();
    info.textContent = `Última atualização: ${new Date().toLocaleTimeString('pt-BR')}`;
  } catch (erro) {
    console.error("Erro ao sincronizar:", erro);
    info.textContent = "❌ Falha ao carregar dados da planilha. Veja o Console (F12).";
  } finally {
    btn.disabled = false;
    btn.textContent = "🔄 Atualizar Dados";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  $('refresh-btn').addEventListener('click', buscarDadosDaPlanilha);
  atualizarInterface();
  buscarDadosDaPlanilha();
  setInterval(buscarDadosDaPlanilha, 60000);
});
