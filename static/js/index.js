// Semantic-GSL project page scripts (no jQuery needed)

// ---------- BibTeX copy (from the template) ----------
function copyBibTeX() {
  const el = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  const copyText = button.querySelector('.copy-text');
  const done = () => {
    button.classList.add('copied');
    copyText.textContent = 'Cop';
    setTimeout(() => { button.classList.remove('copied'); copyText.textContent = 'Copy'; }, 2000);
  };
  navigator.clipboard.writeText(el.textContent).then(done).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = el.textContent; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta); done();
  });
}

// ---------- Scroll to top ----------
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
window.addEventListener('scroll', () => {
  const b = document.querySelector('.scroll-to-top');
  if (b) b.classList.toggle('visible', window.pageYOffset > 300);
});

// ---------- Simulation results (Table III of the paper) ----------
// Each row: [SR, steps, steps_std, error, error_std, time, time_std]
const METHODS = [
  { name: 'Dual-mode planner',   sensor: 'gas' },
  { name: 'Hybrid planner',      sensor: 'gas + vision' },
  { name: 'Semantic-GSL (OGD)',  sensor: 'gas + vision' },
  { name: 'Semantic-GSL (Ours)', sensor: 'gas + vision', ours: true },
];
const SIM = {
  A: {
    '0.0': [[82,65.70,15.97,1.22,0.21,365.27,91.35],[87,58.53,17.16,1.49,0.32,382.82,102.40],[89,54.43,16.17,1.89,0.19,365.29,104.15],[95,49.82,16.94,0.93,0.11,340.33,99.95]],
    '0.5': [[37,82.22,11.39,2.10,0.20,449.99,56.28],[78,68.85,17.35,1.89,0.36,453.41,106.88],[75,63.29,16.77,1.16,0.19,426.20,106.93],[87,58.14,15.48,1.01,0.17,384.39,91.74]],
  },
  B: {
    '0.0': [[93,43.45,11.12,1.25,0.19,286.26,57.99],[78,38.23,12.90,1.32,0.22,273.56,83.84],[85,39.96,13.57,1.17,0.17,308.34,90.63],[94,34.57,13.28,1.05,0.18,263.65,93.56]],
    '0.5': [[18,59.44,17.42,1.54,0.41,318.87,89.49],[56,55.66,17.11,1.86,0.41,310.38,102.16],[52,63.46,19.28,1.65,0.13,433.92,122.87],[85,42.58,17.85,1.21,0.26,301.05,102.51]],
  },
  C: {
    '0.0': [[83,50.06,26.13,2.61,0.53,284.37,149.84],[78,43.26,20.55,2.31,0.29,317.00,137.20],[83,42.64,23.11,2.79,0.29,278.97,171.55],[89,36.64,20.25,1.39,0.30,249.33,151.89]],
    '0.5': [[21,59.10,18.56,3.50,1.32,355.66,95.92],[74,51.57,20.50,2.96,1.41,368.81,141.00],[57,52.26,18.27,1.34,0.16,386.74,122.63],[78,44.15,22.33,1.37,0.19,340.96,129.15]],
  },
  D: {
    '0.0': [[85,44.60,20.18,1.25,0.11,248.92,108.34],[83,39.00,17.92,1.33,0.17,257.95,107.81],[88,46.01,18.73,0.95,0.09,322.13,125.19],[90,37.70,18.38,0.91,0.19,225.78,93.68]],
    '0.5': [[48,40.33,15.22,2.56,0.34,237.11,78.58],[51,43.61,12.29,2.66,0.42,330.83,83.11],[56,35.57,8.56,2.35,0.46,278.44,54.51],[61,35.38,17.31,2.21,0.43,264.53,79.86]],
  },
};
const ENV_NAMES = { A: 'simple indoor', B: 'residential', C: 'residential', D: 'factory' };
let state = { env: 'A', wind: '0.0' };

function fmt(v, d) { return v.toFixed(d); }

function renderSim() {
  const tbody = document.getElementById('sim-tbody');
  if (!tbody) return;
  const rows = SIM[state.env][state.wind];
  // best per column: SR max, others min
  const best = {
    sr: Math.max(...rows.map(r => r[0])),
    sn: Math.min(...rows.map(r => r[1])),
    err: Math.min(...rows.map(r => r[3])),
    t: Math.min(...rows.map(r => r[5])),
  };
  const b = (cond, html) => cond ? `<b>${html}</b>` : html;
  tbody.innerHTML = rows.map((r, i) => {
    const m = METHODS[i];
    return `<tr class="${m.ours ? 'is-ours' : ''}">
      <td>${m.name}</td>
      <td class="col-sensor">${m.sensor}</td>
      <td><div class="sr-cell"><div class="sr-bar" aria-hidden="true"><span style="width:${r[0]}%"></span></div>
          <span class="sr-num">${b(r[0] === best.sr, r[0] + '%')}</span></div></td>
      <td>${b(r[1] === best.sn, fmt(r[1], 2))}<span class="std">(${fmt(r[2], 2)})</span></td>
      <td>${b(r[3] === best.err, fmt(r[3], 2))}<span class="std">(${fmt(r[4], 2)})</span></td>
      <td>${b(r[5] === best.t, fmt(r[5], 2))}<span class="std">(${fmt(r[6], 2)})</span></td>
    </tr>`;
  }).join('');
  document.getElementById('sim-caption').textContent =
    `Env ${state.env} (${ENV_NAMES[state.env]}), wind ${state.wind} m/s. ` +
    'Success rate over 100 runs; other metrics are mean (std) over successful runs. Best value in bold.';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.env ? 'env' : 'wind';
      state[key] = btn.dataset[key];
      btn.parentElement.querySelectorAll('.seg-btn').forEach(x => {
        const on = x === btn;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      renderSim();
    });
  });
  renderSim();
});
