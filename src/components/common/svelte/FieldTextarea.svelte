<script lang="ts">
  export let label: string;
  export let id: string;
  export let placeholder: string = '';
  export let rows: number = 4;
  export let value: string = '';
</script>

<div class="gm-field-group">
  <label for={id}>{label}</label>
  <textarea id={id} name={id} {placeholder} {rows} bind:value></textarea>
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

  .gm-field-group textarea {
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
    resize: vertical;
    min-height: 100px;
  }

  .gm-field-group textarea:focus {
    border-color: var(--gold);
  }

  .gm-field-group textarea::placeholder {
    color: rgba(138,154,181,.5);
  }
</style>
