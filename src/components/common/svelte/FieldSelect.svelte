<script lang="ts">
  export let label: string;
  export let id: string;
  export let options: { value: string; label: string }[] = [];
  export let value: string = '';
</script>

<div class="gm-field-group">
  <label for={id}>{label}</label>
  <select id={id} name={id} bind:value>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
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
</style>
