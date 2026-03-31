<script lang="ts">
  import Field from '../common/svelte/Field.svelte';
  import FieldSelect from '../common/svelte/FieldSelect.svelte';
  import ResultCard from './ResultCard.svelte';

  let monthlySalary = '';
  let yearsWorked = '';
  let caseType = 'despido';
  let signedDocument = 'no';
  
  let showResult = false;
  let minSettlement = 0;
  let maxSettlement = 0;
  let errorMessage = '';

  const caseTypes = [
    { value: 'despido', label: 'Despido injustificado' },
    { value: 'renuncia', label: 'Renuncia bajo presión' },
    { value: 'acoso', label: 'Acoso / discriminación' },
  ];

  const signedOptions = [
    { value: 'no', label: 'No firmé nada' },
    { value: 'si', label: 'Firmé renuncia / finiquito' },
    { value: 'ns', label: 'No estoy seguro' },
  ];

  function calculateSettlement() {
    const salary = parseFloat(monthlySalary) || 0;
    const years = parseFloat(yearsWorked) || 0;

    if (!salary || !years) {
      errorMessage = 'Por favor ingresa tu salario y los años trabajados.';
      showResult = false;
      return;
    }

    errorMessage = '';

    const constitutionalIndemnity = salary * 3;
    
    const dailySalary = salary / 30;
    const seniorityBonus = dailySalary * 20 * years;
    
    const proratedAguinaldo = salary * (15 / 365) * 0.5;
    
    const vacationDays = years <= 1 ? 6 : years <= 2 ? 8 : years <= 3 ? 10 : 12;
    const vacationPay = (salary / 365) * vacationDays * 0.5;
    
    const totalBaseAmount = constitutionalIndemnity + seniorityBonus + proratedAguinaldo + vacationPay;

    minSettlement = Math.round(totalBaseAmount * 0.85 / 1000) * 1000;
    maxSettlement = Math.round(totalBaseAmount * 1.35 / 1000) * 1000;

    showResult = true;

    setTimeout(() => {
      const resultElement = document.querySelector('.gm-calc-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  }
</script>

<section class="gm-calculadora" id="calculadora">
  <div class="gm-container">
    <div class="gm-calc-inner">
      <div class="gm-calc-header">
        <span class="section-label">Herramienta gratuita</span>
        <h2>Calcula tu liquidación estimada</h2>
      </div>
      <div class="gm-calc-body">
        <div class="gm-calc-fields">
          <Field 
            label="Salario mensual (MXN)"
            id="salario"
            inputType="number"
            placeholder="Ej: 12000"
            min={1}
            bind:value={monthlySalary}
          />
          <Field 
            label="Años trabajados"
            id="anios"
            inputType="number"
            placeholder="Ej: 3"
            min={1}
            max={40}
            bind:value={yearsWorked}
          />
          <FieldSelect 
            label="Tipo de caso"
            id="tipo"
            options={caseTypes}
            bind:value={caseType}
          />
          <FieldSelect 
            label="¿Firmaste algo?"
            id="firma"
            options={signedOptions}
            bind:value={signedDocument}
          />
        </div>
        
        {#if errorMessage}
          <div class="gm-calc-error">{errorMessage}</div>
        {/if}
        
        <button class="gm-calc-btn" on:click={calculateSettlement}>
          Calcular mi liquidación estimada →
        </button>
        
        {#if showResult}
          <ResultCard minAmount={minSettlement} maxAmount={maxSettlement} />
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .gm-calculadora {
    padding: 7rem clamp(1.5rem, 5vw, 4rem);
  }

  .gm-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .gm-calc-inner {
    max-width: 780px;
    margin: 0 auto;
    background: var(--navy2);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }

  .gm-calc-header {
    padding: 2rem 2.5rem;
    border-bottom: 1px solid var(--border);
    text-align: center;
  }

  .gm-calc-header h2 {
    margin-top: 0.5rem;
  }

  .gm-calc-body {
    padding: 2.5rem;
  }

  .gm-calc-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .gm-field-group {
    display: flex;
    flex-direction: column;
  }

  .gm-field-group label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--gray);
    margin-bottom: 0.6rem;
  }

  .gm-field-group select {
    width: 100%;
    background: var(--navy);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 4px;
    padding: 0.75rem 1rem;
    font-family: var(--sans);
    font-size: 0.95rem;
    color: var(--white);
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
    cursor: pointer;
  }

  .gm-field-group select:focus {
    border-color: var(--gold);
  }

  .gm-calc-error {
    color: var(--red2);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: rgba(192, 57, 43, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(192, 57, 43, 0.3);
  }

  .gm-calc-btn {
    width: 100%;
    background: var(--gold);
    color: var(--navy);
    font-family: var(--sans);
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 2rem;
  }

  .gm-calc-btn:hover {
    background: var(--gold2);
  }

  @media (max-width: 900px) {
    .gm-calc-fields {
      grid-template-columns: 1fr;
    }
  }
</style>
