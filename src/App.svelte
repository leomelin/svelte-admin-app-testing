<h1>Admin panel</h1>
<h2>{$eventsStore.name}</h2>
<select bind:value={selectedStatus}>
		{#each statusTypes as statusType}
			<option value={statusType}>
				{statusType.name}
			</option>
		{/each}
</select>

<h3>{selectedStatus.name} {eventsStore.getParticipants(selectedStatus).length} / {$eventsStore.participants.length}</h3>
<div>
  <table>
    <tbody>
    {#each eventsStore.getParticipants(selectedStatus) as user (user.id)}
      <TableRow row={user} cols={cols} key="id" />
    {/each}
    </tbody>
  </table>
</div>

<style>
  h1 {
    color: purple;
  }
</style>

<script lang="ts">
  import TableRow from './components/table/TableRow.svelte'
  import EditableValue from './components/table/renderers/EditableValue.svelte'
  import { onMount } from 'svelte'
  import { ParticipantStatus } from './types/ParticipantStatus'
  import { Event } from './types/Event'
  import importedStatusTypes from './constants/status-types'
  import eventsStore from './stores/events.store'
  import importedUsers from './data'
  const statusTypes = importedStatusTypes;

  let selectedStatus: ParticipantStatus = { id: 'REGISTERED', name: 'Registered' }
  let cols = [
      {
        key: 'firstName',
        renderer: (value: any) => {
          return value;
        }
      },
      {
        key: 'lastName',
        renderer: (value: any) => {
          return {
            component: EditableValue,
            props: {
              value
            }
          };
        }
      }
  ]
  export let name: string
  onMount(async () => {
    const results = await (await fetch('http://localhost:5001/admin-api/events/1')).json()
    eventsStore.setEvent(results);
  });
</script>
