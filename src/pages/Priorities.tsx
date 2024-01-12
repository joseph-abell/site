import { Show, createSignal, onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors, PointElement, LinearScale} from 'chart.js'

import DefaultTemplate from '../layouts/DefaultLayout';
import { supabase } from '../helpers';
import AddPriority from '../components/AddPriority';
import PriorityList from '../components/PriorityList';
import PrioritiesComponent from '../components/Priorities';

const Priorities = () => {
    document.title = 'Priorities - Joseph Abell';
  const [data, setData] = createSignal([]);
  const [priorityToEdit, setPriorityToEdit] = createSignal();
  const [password, setPassword] = createSignal('');
  const [correctPassword, setCorrectPassword] = createSignal(false)

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
  const clearId = () => setPriorityToEdit(undefined);
  const onPasswordSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch('https://josephabell.co.uk/.netlify/functions/password', {
        method: 'POST',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ userInput: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });

    console.log(response);
  }

  return (
    <DefaultTemplate>
        <Show when={correctPassword()}>
            <div style={{ display: 'flex', 'justify-content': 'space-between'}}>
                <AddPriority refreshData={getData} id={priorityToEdit} clearId={clearId} />
                <PrioritiesComponent data={data} />
                <PriorityList priorities={data} markAsDone={markAsDone} editPriority={editPriority} />
            </div>
        </Show>

        <Show when={!correctPassword()}>
            <h1>Password Locked</h1>

            <form onSubmit={onPasswordSubmit}>
                <div>
                    <label style={{display: 'block'}} for='password'>Password</label>
                    <input type='password' id='password' name='password' onChange={(e) => {setPassword(e.target.value)}} />
                </div>
            </form>
        </Show>
        
    </DefaultTemplate>
  );
};

export default Priorities;
