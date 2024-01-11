import { createSignal, onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors, PointElement, LinearScale} from 'chart.js'
import { DefaultChart } from 'solid-chartjs'
import DataLabels from 'chartjs-plugin-datalabels';
import DefaultTemplate from '../layouts/DefaultLayout';
import { supabase } from '../helpers';
import AddPriority from '../components/AddPriority';
import PriorityList from '../components/PriorityList';

const Priorities = () => {
    document.title = 'Priorities - Joseph Abell';
  const [data, setData] = createSignal([]);

  const getData = async () => {
    const { data, error } = await supabase
        .from('priorities')
        .select('*');

    const results = data.map(i => ({label: i.name, x: i.urgency, y: i.importance, hidden: i.hidden, id: i.id })).filter(i => !i.hidden);

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

  return (
    <DefaultTemplate>
        <div style={{ display: 'flex', 'justify-content': 'space-between', 'padding-top': '40px'}}>
            <div style={{ height: '500px'}}>
                <h2>Priorities</h2>
                <DefaultChart
                    type='scatter'
                    data={{
                        datasets: [
                            {
                                data: data(),
                                backgroundColor: 'rgb(255, 99, 122)',
                            }
                        ]
                    }}
                    options={{
                        animation: false,
                        responsive: false,
                        scales: {
                            x: {
                                type: 'linear',
                                min: 0,
                                max: 5,
                                title: { text: 'Urgency', display: true, },
                                beginAtZero: true,
                            },
                            y: {
                                type: 'linear',
                                min: 0,
                                max: 5,
                                title: { text: 'Importance', display: true, },
                                beginAtZero: true
                            }
                        },
                        plugins: {
                            datalabels: {
                                align: 'left',
                                formatter: (data: any) => {
                                    return data.label;
                                }
                            }
                        }
                    }}
                    plugins={[DataLabels]}
                />
            </div>
            <PriorityList priorities={data} markAsDone={markAsDone} />
            <AddPriority />
        </div>
    </DefaultTemplate>
  );
};

export default Priorities;
