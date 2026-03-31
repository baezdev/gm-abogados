<script lang="ts">
  import Field from "../common/svelte/Field.svelte";
  import FieldSelect from "../common/svelte/FieldSelect.svelte";
  import FieldTextarea from "../common/svelte/FieldTextarea.svelte";

  let name = "";
  let phone = "";
  let problem = "";
  let message = "";

  let errors: Record<string, string> = {};
  let isSubmitting = false;
  let isSuccess = false;

  const problemOptions = [
    { value: "", label: "Selecciona tu situación" },
    { value: "despido", label: "Despido injustificado" },
    { value: "acoso", label: "Acoso o discriminación laboral" },
    { value: "horas", label: "Horas extras no pagadas" },
    { value: "accidente", label: "Accidente o enfermedad laboral" },
    { value: "contrato", label: "Contrato irregular o salario incorrecto" },
    { value: "otro", label: "Otro" },
  ];

  function validatePhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10;
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = "Ingresa tu nombre completo";
    }

    if (!phone.trim() || !validatePhone(phone)) {
      newErrors.phone = "Ingresa un teléfono válido (10 dígitos)";
    }

    if (!problem) {
      newErrors.problem = "Selecciona tu tipo de problema";
    }

    if (message.length > 1000) {
      newErrors.message = "Máximo 1000 caracteres";
    }

    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();

    if (!validateForm()) return;

    isSubmitting = true;
    errors = {};

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, problem, message }),
      });

      if (response.ok) {
        isSuccess = true;
        name = "";
        phone = "";
        problem = "";
        message = "";
      } else {
        const data = await response.json();
        errors.form = data.message || "Error al enviar. Intenta de nuevo.";
      }
    } catch (err) {
      errors.form = "Error de conexión. Intenta de nuevo.";
    } finally {
      isSubmitting = false;
    }
  }
</script>

{#if isSuccess}
  <div class="gm-form-success">
    <div class="gm-success-icon">
      <svg
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
    <h3>¡Mensaje enviado!</h3>
    <p>
      Te contactaremos en menos de 24 horas para agendar tu consulta gratuita.
    </p>
    <button
      type="button"
      class="gm-form-submit"
      on:click={() => (isSuccess = false)}
    >
      Enviar otro mensaje
    </button>
  </div>
{:else}
  <form class="gm-form" on:submit={handleSubmit} novalidate>
    {#if errors.form}
      <div class="gm-form-error">{errors.form}</div>
    {/if}

    <div class="gm-form-row">
      <div class="gm-field-wrapper">
        <Field
          id="gm-name"
          label="Nombre completo"
          placeholder="Tu nombre"
          bind:value={name}
        />
        {#if errors.name}
          <span class="gm-field-error">{errors.name}</span>
        {/if}
      </div>

      <div class="gm-field-wrapper">
        <Field
          id="gm-phone"
          label="Teléfono / WhatsApp"
          inputType="tel"
          placeholder="55 0000 0000"
          bind:value={phone}
        />
        {#if errors.phone}
          <span class="gm-field-error">{errors.phone}</span>
        {/if}
      </div>
    </div>

    <div class="gm-field-wrapper">
      <FieldSelect
        id="gm-problem"
        label="Tipo de problema"
        options={problemOptions}
        bind:value={problem}
      />
      {#if errors.problem}
        <span class="gm-field-error">{errors.problem}</span>
      {/if}
    </div>

    <div class="gm-field-wrapper">
      <FieldTextarea
        id="gm-message"
        label="Cuéntanos brevemente tu caso"
        placeholder="¿Qué pasó? ¿Cuándo ocurrió? ¿Firmaste algo?"
        rows={4}
        bind:value={message}
      />
      <div class="gm-field-meta">
        {#if errors.message}
          <span class="gm-field-error">{errors.message}</span>
        {/if}
        <span class="gm-char-count" class:limit={message.length > 1000}
          >{message.length}/1000</span
        >
      </div>
    </div>

    <button type="submit" class="gm-form-submit" disabled={isSubmitting}>
      {#if isSubmitting}
        Enviando...
      {:else}
        Enviar — Mi Consulta es Gratis
      {/if}
    </button>
    <p class="gm-form-disclaimer">
      Al enviar aceptas ser contactado para tu consulta gratuita. Sin spam, sin
      compromiso. Tu información es confidencial.
    </p>
  </form>
{/if}

<style>
  .gm-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .gm-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .gm-field-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .gm-field-error {
    font-size: 0.75rem;
    color: #ff6b6b;
    margin-top: 0.25rem;
  }

  .gm-field-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25rem;
  }

  .gm-char-count {
    font-size: 0.7rem;
    color: var(--gray);
    margin-left: auto;
  }

  .gm-char-count.limit {
    color: #ff6b6b;
  }

  .gm-form-error {
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: #ff6b6b;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-size: 0.85rem;
  }

  .gm-form-submit {
    width: 100%;
    background: var(--red);
    color: #fff;
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
    margin-top: 0.5rem;
  }

  .gm-form-submit:hover:not(:disabled) {
    background: var(--red2);
  }

  .gm-form-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .gm-form-disclaimer {
    font-size: 0.75rem;
    color: var(--gray);
    margin-top: 0.75rem;
    line-height: 1.5;
  }

  .gm-form-success {
    text-align: center;
    padding: 2rem;
  }

  .gm-success-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1.5rem;
    background: rgba(37, 211, 102, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gm-success-icon svg {
    stroke: #25d366;
  }

  .gm-form-success h3 {
    font-family: var(--serif);
    font-size: 1.5rem;
    color: var(--white);
    margin-bottom: 0.5rem;
  }

  .gm-form-success p {
    color: var(--gray);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  @media (max-width: 600px) {
    .gm-form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
