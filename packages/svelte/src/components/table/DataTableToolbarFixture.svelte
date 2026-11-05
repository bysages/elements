<script lang="ts">
import { createColumnHelper } from "@tanstack/svelte-table";

import DataTable from "./DataTable.svelte";

let query = $state("");

const col = createColumnHelper<any, any>();
const columns = col.columns([
  col.accessor("name", { header: "Name" }),
  col.accessor("status", { header: "Status" }),
]);
const data = [
  { id: "ink", name: "Ink stick", status: "ready" },
  { id: "paper", name: "Rice paper", status: "ready" },
];
</script>

<DataTable {data} {columns} filterable showToolbar={false}>
  {#snippet toolbar(contract)}
    <input
      data-testid="custom-filter"
      value={query}
      oninput={(event) => {
        query = (event.currentTarget as HTMLInputElement).value;
        contract.setGlobalFilter(query);
      }}
    />
    <button data-testid="set-filter" onclick={() => contract.setGlobalFilter("ink")}>Set</button>
    <button
      data-testid="set-column-filter"
      onclick={() => contract.setColumnFilters([{ id: "status", value: "ready" }])}
    >
      Column
    </button>
    <button data-testid="clear-filters" onclick={() => contract.clearFilters()}>Clear</button>
    <output data-testid="contract-filter">{contract.globalFilter}|{query}</output>
    <span data-testid="column-filter-count">{contract.columnFilters.length}</span>
  {/snippet}
</DataTable>
