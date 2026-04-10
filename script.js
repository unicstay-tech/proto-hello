// === DONNÉES ===
const DATA = {
  top10: [
    { name: "Vignabulle & Spa & Sauna", loc: "Ardèche", ventes: 39, prix: 294, va: 11452 },
    { name: "Bulle Sterenn & SPA privatif", loc: "Côtes-d'Armor", ventes: 39, prix: 183, va: 7140 },
    { name: "La bulle du coq & Spa", loc: "Loire", ventes: 24, prix: 248, va: 5956 },
    { name: "Bulle de nature & Spa", loc: "Maine-et-Loire", ventes: 26, prix: 210, va: 5463 },
    { name: "La Bulle Spa des Rêves", loc: "Jura", ventes: 14, prix: 299, va: 4184 },
    { name: "Bulle de Printemps & Spa", loc: "Cantal", ventes: 10, prix: 411, va: 4108 },
    { name: "Bulle de tuffe & Spa", loc: "Maine-et-Loire", ventes: 18, prix: 212, va: 3813 },
    { name: "La Cabane-Spa des Figuiers", loc: "Dordogne", ventes: 13, prix: 293, va: 3811 },
    { name: "La Cabane-Spa Hobbit", loc: "Dordogne", ventes: 11, prix: 327, va: 3598 },
    { name: "La Bulle sur Rouvres", loc: "Calvados", ventes: 13, prix: 236, va: 3063 },
  ],

  concentration: {
    labels: ["20+ ventes (~5)", "11–20 ventes (~15)", "6–10 ventes (~40)", "4–5 ventes (~80)", "2–3 ventes (~160)", "1 vente (~400)"],
    va: [35000, 45000, 90000, 80000, 95000, 94000],
    pct: [7, 9, 18, 16, 19, 19],
    colors: ["#1babb5", "#4ecad3", "#7f204e", "#a84070", "#c0b8aa", "#e0ddd5"]
  },

  types: {
    labels: ["Bulle", "Cabane", "Dôme", "Autres", "Tonneau", "Chalet", "Kota", "Roulotte"],
    ventes: [285, 73, 62, 121, 20, 16, 6, 7],
    va: [65341, 18749, 14566, 25186, 3738, 4088, 1593, 790],
    prixMoyen: [229, 257, 235, 208, 187, 256, 266, 113]
  },

  prix: {
    labels: ["< 150 €", "150–200 €", "200–250 €", "250–300 €", "300–350 €", "> 350 €"],
    ventes: [65, 111, 241, 127, 36, 10],
    va: [8794, 19673, 53789, 36120, 11567, 4108]
  },

  spa: {
    catalogue: {
      labels: ["Avec spa (~60 % CA)", "Sans spa (~40 % CA)"],
      va: [300800, 200000],
      colors: ["#1babb5", "#ddd8ce"]
    },
    perf: {
      labels: ["Avec spa", "Sans spa"],
      prix: [259, 201],
      va_par_heb: [2738, 1571]
    },
    noSpa: [
      { name: "La Bulle sur Rouvres", loc: "Calvados", ventes: 13, prix: 236, va: 3063 },
      { name: "Dôme au milieu des Alpagas", loc: "Vosges", ventes: 12, prix: 232, va: 2780 },
      { name: "Dôme étoilé", loc: "Maine-et-Loire", ventes: 11, prix: 237, va: 2602 },
      { name: "Bulle suspendue — Royaume des Gourmets", loc: "Isère", ventes: 17, prix: 148, va: 2520 },
      { name: "Dôme les 3 Flocons", loc: "Alpes-Maritimes", ventes: 11, prix: 223, va: 2452 },
      { name: "Aurore Boréale", loc: "Haute-Saône", ventes: 9, prix: 216, va: 1943 },
      { name: "EntreNous — La Toue Père et Fils", loc: "Maine-et-Loire", ventes: 7, prix: 262, va: 1832 },
      { name: "La Palombière", loc: "Gers", ventes: 5, prix: 356, va: 1780 },
    ]
  },

    labels: ["Maine-et-Loire", "Ardèche", "Isère", "Côtes-d'Armor", "Dordogne", "Cantal", "Loire", "Vosges", "Jura", "Savoie", "Drôme", "Loire-Atlantique", "Haute-Garonne", "Calvados", "Var"],
    va: [17227, 12222, 10926, 10474, 7409, 6047, 5956, 4373, 4184, 3800, 3784, 3687, 3512, 3063, 2847],
    ventes: [77, 45, 57, 53, 24, 16, 24, 18, 14, 18, 15, 21, 17, 13, 13]
  }
};

// === COLORS ===
const COLORS = {
  turquoise: "#1babb5",
  turquoiseLight: "#4ecad3",
  turquoiseDark: "#12848c",
  bordeaux: "#7f204e",
  bordeauxLight: "#a84070",
  gold: "#c9922a",
  green: "#2a9d5c",
  orange: "#e07b2a",
  slate: "#3c3c4a",
  muted: "#6b6b7a",
  border: "#ddd8ce"
};

// === CHART DEFAULTS ===
Chart.defaults.font.family = "-apple-system, 'Helvetica Neue', Arial, sans-serif";
Chart.defaults.color = COLORS.muted;

// === TOP 10 LIST ===
function renderTop10() {
  const container = document.getElementById("top10List");
  DATA.top10.forEach((h, i) => {
    const el = document.createElement("div");
    el.className = "top10-item";
    el.innerHTML = `
      <div class="top10-rank">${i + 1}</div>
      <div class="top10-info">
        <div class="top10-name">${h.name}</div>
        <div class="top10-meta">${h.loc} · ${h.ventes} ventes · ${h.prix} € moy</div>
      </div>
      <div class="top10-va">${h.va.toLocaleString("fr-FR")} €</div>
    `;
    container.appendChild(el);
  });
}

// === CHART CONCENTRATION ===
function renderChartConcentration() {
  const ctx = document.getElementById("chartConcentration").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: DATA.concentration.labels,
      datasets: [{
        data: DATA.concentration.va,
        backgroundColor: DATA.concentration.colors,
        borderWidth: 2,
        borderColor: "#faf8f4"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const va = ctx.raw.toLocaleString("fr-FR");
              const pct = DATA.concentration.pct[ctx.dataIndex];
              return ` ${va} € · ${pct} % du CA`;
            }
          }
        }
      }
    }
  });

  // Legend custom
  const legendContainer = document.getElementById("legendConcentration");
  DATA.concentration.labels.forEach((label, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `
      <div class="legend-dot" style="background:${DATA.concentration.colors[i]}"></div>
      <span>${label} — ${DATA.concentration.pct[i]} %</span>
    `;
    legendContainer.appendChild(item);
  });
}

// === CHART TYPES VENTES ===
function renderChartTypes() {
  const ctx = document.getElementById("chartTypes").getContext("2d");
  const sorted = [...DATA.types.labels.keys()].sort((a, b) => DATA.types.ventes[b] - DATA.types.ventes[a]);
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(i => DATA.types.labels[i]),
      datasets: [{
        label: "Ventes",
        data: sorted.map(i => DATA.types.ventes[i]),
        backgroundColor: sorted.map((i, rank) => {
          if (rank === 0) return COLORS.turquoise;
          if (rank === 1) return COLORS.bordeaux;
          if (rank === 2) return COLORS.turquoiseLight;
          return COLORS.border;
        }),
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.raw} ventes`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(0,0,0,0.04)" },
          ticks: { font: { size: 11 } }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

// === CHART PRIX TYPES ===
function renderChartPrixTypes() {
  const ctx = document.getElementById("chartPrixTypes").getContext("2d");
  const sorted = [...DATA.types.labels.keys()].sort((a, b) => DATA.types.prixMoyen[b] - DATA.types.prixMoyen[a]);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(i => DATA.types.labels[i]),
      datasets: [{
        label: "Prix moyen (€)",
        data: sorted.map(i => DATA.types.prixMoyen[i]),
        backgroundColor: sorted.map((i) => {
          const prix = DATA.types.prixMoyen[i];
          if (prix >= 250) return COLORS.gold;
          if (prix >= 200) return COLORS.turquoise;
          return COLORS.border;
        }),
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.raw} € moyen`
          }
        }
      },
      scales: {
        x: {
          grid: { color: "rgba(0,0,0,0.04)" },
          ticks: { font: { size: 11 }, callback: v => v + " €" }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

// === CHART PRIX / VOLUME ===
function renderChartPrix() {
  const ctx = document.getElementById("chartPrix").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: DATA.prix.labels,
      datasets: [
        {
          label: "Volume de ventes",
          data: DATA.prix.ventes,
          backgroundColor: DATA.prix.labels.map(l => l === "200–250 €" ? COLORS.turquoise : COLORS.border),
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: "yVentes"
        },
        {
          label: "VA (€)",
          data: DATA.prix.va,
          type: "line",
          borderColor: COLORS.bordeaux,
          backgroundColor: "rgba(127,32,78,0.08)",
          pointBackgroundColor: COLORS.bordeaux,
          pointRadius: 5,
          fill: true,
          tension: 0.4,
          yAxisID: "yVA"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" },
      plugins: {
        legend: {
          position: "top",
          labels: { font: { size: 11 }, boxWidth: 12 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) return ` ${ctx.raw} ventes`;
              return ` ${ctx.raw.toLocaleString("fr-FR")} € VA`;
            }
          }
        }
      },
      scales: {
        yVentes: {
          type: "linear",
          position: "left",
          grid: { color: "rgba(0,0,0,0.04)" },
          ticks: { font: { size: 11 } },
          title: { display: true, text: "Ventes", font: { size: 10 } }
        },
        yVA: {
          type: "linear",
          position: "right",
          grid: { display: false },
          ticks: { font: { size: 11 }, callback: v => v.toLocaleString("fr-FR") + " €" },
          title: { display: true, text: "VA (€)", font: { size: 10 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 } }
        }
      }
    }
  });
}

// === CHART SPA CATALOGUE ===
function renderChartSpaCatalogue() {
  const ctx = document.getElementById("chartSpaCatalogue").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: DATA.spa.catalogue.labels,
      datasets: [{
        data: DATA.spa.catalogue.va,
        backgroundColor: DATA.spa.catalogue.colors,
        borderWidth: 2,
        borderColor: "#faf8f4"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { position: "bottom", labels: { font: { size: 11 }, boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.raw.toLocaleString("fr-FR")} € VA estimée`
          }
        }
      }
    }
  });
}

// === CHART SPA PERFORMANCE ===
function renderChartSpaPerf() {
  const ctx = document.getElementById("chartSpaPerf").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: DATA.spa.perf.labels,
      datasets: [
        {
          label: "Prix moyen (€)",
          data: DATA.spa.perf.prix,
          backgroundColor: [COLORS.turquoise, COLORS.border],
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: "yPrix"
        },
        {
          label: "VA moy/hébergement (€)",
          data: DATA.spa.perf.va_par_heb,
          type: "line",
          borderColor: COLORS.gold,
          backgroundColor: "rgba(201,146,42,0.1)",
          pointBackgroundColor: COLORS.gold,
          pointRadius: 6,
          fill: false,
          yAxisID: "yVA"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { font: { size: 11 }, boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) return ` ${ctx.raw} € prix moyen`;
              return ` ${ctx.raw.toLocaleString("fr-FR")} € VA/hébergement`;
            }
          }
        }
      },
      scales: {
        yPrix: {
          type: "linear", position: "left",
          grid: { color: "rgba(0,0,0,0.04)" },
          ticks: { font: { size: 10 }, callback: v => v + " €" },
          title: { display: true, text: "Prix moyen", font: { size: 10 } }
        },
        yVA: {
          type: "linear", position: "right",
          grid: { display: false },
          ticks: { font: { size: 10 }, callback: v => v.toLocaleString("fr-FR") + " €" },
          title: { display: true, text: "VA/hébergement", font: { size: 10 } }
        },
        x: { grid: { display: false }, ticks: { font: { size: 12 } } }
      }
    }
  });
}

// === NO SPA LIST ===
function renderNoSpaList() {
  const container = document.getElementById("noSpaList");
  DATA.spa.noSpa.forEach((h, i) => {
    const el = document.createElement("div");
    el.className = "top10-item";
    el.innerHTML = `
      <div class="top10-rank">${i + 1}</div>
      <div class="top10-info">
        <div class="top10-name">${h.name}</div>
        <div class="top10-meta">${h.loc} · ${h.ventes} ventes · ${h.prix} € moy · USP non-spa</div>
      </div>
      <div class="top10-va">${h.va.toLocaleString("fr-FR")} €</div>
    `;
    container.appendChild(el);
  });
}

// === CHART GEO ===
function renderChartGeo() {
  const ctx = document.getElementById("chartGeo").getContext("2d");
  const sorted = [...DATA.geo.labels.keys()].sort((a, b) => DATA.geo.va[b] - DATA.geo.va[a]);

  const isConcentrated = (i) => DATA.geo.labels[i] === "Maine-et-Loire";

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: sorted.map(i => DATA.geo.labels[i]),
      datasets: [
        {
          label: "VA (€)",
          data: sorted.map(i => DATA.geo.va[i]),
          backgroundColor: sorted.map(i => isConcentrated(i) ? COLORS.bordeaux : COLORS.turquoise),
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: "yVA"
        },
        {
          label: "Ventes",
          data: sorted.map(i => DATA.geo.ventes[i]),
          type: "line",
          borderColor: COLORS.gold,
          backgroundColor: "rgba(201,146,42,0.08)",
          pointBackgroundColor: COLORS.gold,
          pointRadius: 4,
          fill: false,
          tension: 0.3,
          yAxisID: "yVentes"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index" },
      plugins: {
        legend: {
          position: "top",
          labels: { font: { size: 11 }, boxWidth: 12 }
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              if (ctx.datasetIndex === 0) return ` ${ctx.raw.toLocaleString("fr-FR")} € VA`;
              return ` ${ctx.raw} ventes`;
            }
          }
        }
      },
      scales: {
        yVA: {
          type: "linear",
          position: "left",
          grid: { color: "rgba(0,0,0,0.04)" },
          ticks: {
            font: { size: 10 },
            callback: v => v.toLocaleString("fr-FR") + " €"
          }
        },
        yVentes: {
          type: "linear",
          position: "right",
          grid: { display: false },
          ticks: { font: { size: 10 } }
        },
        x: {
          grid: { display: false },
          ticks: { font: { size: 11 }, maxRotation: 30 }
        }
      }
    }
  });
}

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  renderTop10();
  renderChartConcentration();
  renderChartTypes();
  renderChartPrixTypes();
  renderChartPrix();
  renderChartSpaCatalogue();
  renderChartSpaPerf();
  renderNoSpaList();
  renderChartGeo();
});
