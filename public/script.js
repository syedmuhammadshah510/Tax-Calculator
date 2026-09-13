document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tax-form');
  const resultsContainer = document.getElementById('results');
  const statusEl = document.getElementById('server-status');

  // Check server health
  fetch('/health')
    .then(res => res.json())
    .then(data => {
      if (data.status === 'UP') {
        statusEl.textContent = 'Service Online (IBM Cloud Code Engine)';
      }
    })
    .catch(() => {
      statusEl.textContent = 'Service Standalone / Offline';
    });

  // Handle calculation submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const income = parseFloat(document.getElementById('income').value);
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    if (isNaN(income) || income < 0) {
      alert('Please enter a valid, non-negative income amount.');
      return;
    }

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ income, deductions })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate tax liability');
      }

      displayResults(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  });

  function displayResults(data) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    document.getElementById('res-taxable').textContent = formatter.format(data.taxableIncome);
    document.getElementById('res-tax-owed').textContent = formatter.format(data.taxOwed);
    document.getElementById('res-net').textContent = formatter.format(data.netIncome);
    document.getElementById('res-rate').textContent = `${data.effectiveRate}%`;

    const tbody = document.getElementById('res-breakdown-body');
    tbody.innerHTML = '';

    data.breakdown.forEach(tier => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${tier.bracket}</strong></td>
        <td>${tier.rate * 100}%</td>
        <td>${formatter.format(tier.taxableAmount)}</td>
        <td>${formatter.format(tier.taxOwed)}</td>
      `;
      tbody.appendChild(tr);
    });

    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
