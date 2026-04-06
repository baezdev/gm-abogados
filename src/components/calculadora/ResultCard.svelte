<script lang="ts">
  import { slide } from "svelte/transition";

  export let minAmount: number;
  export let maxAmount: number;

  const formatCurrency = (amount: number) => {
    return "$" + amount.toLocaleString("es-MX");
  };
</script>

<div class="gm-calc-result visible" transition:slide>
  <div class="gm-calc-result-label">Podrías recuperar entre</div>
  <div class="gm-calc-result-amount">
    {formatCurrency(minAmount)} — {formatCurrency(maxAmount)}
  </div>
  <div class="gm-calc-result-note">
    Estimado basado en indemnización constitucional + prima de antigüedad +
    prestaciones. El monto exacto depende de tu caso.
  </div>
  <a href="#contacto" class="gm-calc-result-cta">
    Reclamar mis {formatCurrency(minAmount).replace("$", "")} — Consulta gratis
  </a>
</div>

<style>
  .gm-calc-result {
    display: none;
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 6px;
    padding: 1.75rem;
    background: rgba(201, 168, 76, 0.05);
  }

  .gm-calc-result.visible {
    display: block;
  }

  .gm-calc-result-label {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }

  .gm-calc-result-amount {
    font-family: var(--serif);
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--white);
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .gm-calc-result-note {
    font-size: 0.82rem;
    color: var(--gray);
    margin-bottom: 1.5rem;
  }

  .gm-calc-result-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--red);
    color: #fff;
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
  }

  .gm-calc-result-cta:hover {
    background: var(--red2);
  }
</style>
