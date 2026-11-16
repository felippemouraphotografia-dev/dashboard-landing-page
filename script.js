// 1. Cole aqui o URL gerado pelo Google Apps Script
const API_URL = "https://script.google.com/macros/s/AKfycbzCOnC1flDhnRhJ_6bR28aTB62dsbtfo6aoLXTPBsQr7jbPkg_Trd28T9W441pEydPIxg/exec";

// Estrutura inicial dos dados do Dashboard
const dashboardData = {
  visitas: 0,
  cliquesContato: 0,
  leads: 0,
  historicoTráfego: [0, 0, 0, 0, 0, 0, 0],
  diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
  eventosRecentes: [
    { desc: "Dashboard inicializado", hora: "Agora" }
  ]
};

// Função para atualizar os elementos visuais na tela
function atualizarInterface() {
  const { visitas, cliquesContato, leads, eventosRecentes } = dashboardData;

  document.getElementById('val-visitas').innerText = visitas.toLocaleString('pt-BR');
  document.getElementById('val-cliques').innerText = cliquesContato.toLocaleString('pt-BR');
  document.getElementById('val-leads').innerText = leads.toLocaleString('pt-BR');

  const taxa = visitas > 0 ? ((leads / visitas) * 100).toFixed(1) : 0;
  document.getElementById('val-conversao').innerText = `${taxa}%`;

  const activityList = document.getElementById('activity-list');
  if (activityList) {
    activityList.innerHTML = '';
    eventosRecentes.forEach(evento => {
      const li = document.createElement('li');
      li.className = 'activity-item';
      li.innerHTML = `
        <span class="activity-desc">${evento.desc}</span>
        <span class="activity-time">${evento.hora}</span>
      `;
      activityList.appendChild(li);
    });
  }

  desenharGrafico();
}

// Função para desenhar o gráfico em canvas nativo
function desenharGrafico() {
  const canvas = document.getElementById('trafficChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const width = canvas.width;
  const height = canvas.height;
  const data = dashboardData.historicoTráfego;
  const labels = dashboardData.diasSemana;

  ctx.clearRect(0, 0, width, height);

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data, 10);

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let i = 0; i <= 3; i++) {
    const y = padding + (chartHeight / 3) * i;
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
  }
  ctx.stroke();

  const stepX = chartWidth / (data.length - 1);
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#2563eb';

  data.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (val / maxValue) * chartHeight;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = '#2563eb';
  ctx.font = '12px system-ui';
  ctx.textAlign = 'center';

  data.forEach((val, i) => {
    const x = padding + i * stepX;
    const y = height - padding - (val / maxValue) * chartHeight;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.fillText(labels[i], x, height - 10);
    ctx.fillStyle = '#2563eb';
  });
}

// Função para buscar dados reais da planilha através da API do Google Apps Script
async function buscarDadosDaPlanilha() {
  const btnRefresh = document.getElementById('btn-refresh');
  try {
    btnRefresh.textContent = "🔄 A sincronizar...";
    
    const resposta = await fetch(API_URL);
    const dadosReais = await resposta.json();

    // Atualizar os dados locais com os valores reais da planilha
    dashboardData.visitas = dadosReais.visitas;
    dashboardData.cliquesContato = dadosReais.cliquesContato;
    dashboardData.leads = dadosReais.leads;
    dashboardData.historicoTráfego = dadosReais.historicoTráfego;
    dashboardData.eventosRecentes = dadosReais.eventosRecentes;

    atualizarInterface();
    btnRefresh.textContent = "🔄 Atualizar Dados";
  } catch (erro) {
    console.error("Erro ao sincronizar com a planilha:", erro);
    btnRefresh.textContent = "🔄 Erro ao atualizar";
    setTimeout(() => { btnRefresh.textContent = "🔄 Atualizar Dados"; }, 2000);
  }
}

// Evento do botão de atualizar dados no Dashboard
document.getElementById('btn-refresh').addEventListener('click', () => {
  buscarDadosDaPlanilha();
});

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  atualizarInterface();
});