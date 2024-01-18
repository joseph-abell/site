import { Show, createSignal, createEffect, onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors, PointElement, LinearScale} from 'chart.js'

import DefaultTemplate from '../layouts/DefaultLayout';
import { supabase } from '../helpers';
import AddPriority from '../components/AddPriority';
import PriorityList from '../components/PriorityList';
import PrioritiesComponent from '../components/Priorities';

const Priorities = () => {
    document.title = 'Priorities - Joseph Abell';
  const [data, setData] = createSignal([]);
  const [sortedData, setSortedData] = createSignal([]);
  const [priorityToEdit, setPriorityToEdit] = createSignal();

  createEffect(() => {
    setSortedData(data().sort((a: any, b: any) => (b.x * b.y) - (a.x * a.y)))
  });

  const getData = async () => {
    const { data, error } = await supabase
        .from('priorities')
        .select('*')
        .eq('hidden', false);

    const results = data.map(i => ({
        label: i.name,
        x: i.urgency,
        y: i.importance,
        hidden: i.hidden,
        id: i.id
    }));

    if (error) {
        console.error('Error fetching priorities:', error);
    } else {
        setData(results);
    }
  }

  onMount(async () => {
    await getData();   
    Chart.register(Title, Tooltip, Legend, Colors, PointElement, LinearScale)
  });

  const markAsDone = async (id: number) => {
    await supabase
        .from('priorities')
        .update({ hidden: true })
        .eq('id', id);
    await getData();
  }

  const editPriority = (id?: number) => setPriorityToEdit(id);
  const clearPriority = () => setPriorityToEdit(undefined);

  return (
    <DefaultTemplate>
        <div style={{ display: 'flex', 'justify-content': 'space-between'}}>
            <AddPriority refreshData={getData} id={priorityToEdit} clearId={clearPriority} />
            <PrioritiesComponent data={sortedData()} />
            <PriorityList priorities={sortedData()} markAsDone={markAsDone} editPriority={editPriority} />
        </div>
        
    </DefaultTemplate>
  );
};

export default Priorities;
