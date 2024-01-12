import { DefaultChart } from 'solid-chartjs'
import DataLabels from 'chartjs-plugin-datalabels';

const Priorities = (props: any) => {    
    return (
        <div style={{ height: '500px'}}>
            <h2>Priorities</h2>
            <DefaultChart
                type='scatter'
                data={{
                    datasets: [
                        {
                            data: props.data(),
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
    );
};

export default Priorities;
