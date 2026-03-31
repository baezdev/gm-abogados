<script lang="ts">
  export let label: string;
  export let id: string;
  export let inputType: string = 'text';
  export let placeholder: string = '';
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
  export let value: string = '';
  
  $: inputAttrs = {
    type: inputType,
    id: id,
    name: id,
    placeholder: placeholder,
    min: min,
    max: max
  };
</script>

<div class="gm-field-group">
  <label for={id}>{label}</label>
  <input {...inputAttrs} bind:value />
</div>

<style>
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

  .gm-field-group input {
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
  }

  .gm-field-group input:focus {
    border-color: var(--gold);
  }

  .gm-field-group input::placeholder {
    color: rgba(138,154,181,.5);
  }
</style>
