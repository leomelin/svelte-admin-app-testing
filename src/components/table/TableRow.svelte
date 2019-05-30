<tr>
  {#each cols as col (col[key])}
  <td>
  {#if isSvelteComponentRenderer(col)}
    <svelte:component this={getRendererValue(col).component} {...getRendererValue(col).props || {}} />
  {:else}
    {col.renderer(row[col.key])}
  {/if}
  </td>
  {/each}
</tr>

<script lang="ts">
export let row: any = {};
export let cols: any[] = [];
export let key = "";

const getRendererValue = (col: any) => {
  return col.renderer(row[col.key])
}

const isSvelteComponentRenderer = (col: any) => {
  const rendererVal = getRendererValue(col);
  return !!(typeof rendererVal === 'object' && rendererVal.component)
}
</script>
