import { createResource, For } from 'solid-js'
import DefaultLayout from "../layouts/DefaultLayout";
import { supabase } from '../helpers';

const Row = (props: any) => {
    const y = props.index() * 3 * 10;
return (
    <g>
        <line x1="0" y1={y + 5} x2="100%" y2={y + 5} stroke={props.row.breakfast ? 'yellow' : 'black'} stroke-width='10' />
        <line x1="0" y1={y + 15} x2="100%" y2={y + 15} stroke={props.row.lunch ? 'blue' : 'black'} stroke-width='10' />
        <line x1="0" y1={y + 25} x2="100%" y2={y + 25} stroke={props.row.dinner ? 'red' : 'black'} stroke-width='10' />
    </g>
) }

const SVG = (props: any) => {
    return (<>
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height={props.days().length * 3 * 10} style={{ position: 'absolute', 'z-index': 0 }}>
        {<For each={props.days()}>{(row: any, index) => (
            <Row row={row} index={index} />)}
        </For>} 
    </svg>
    </>
)}

const HorizontalLinesSVG = () => {
    async function fetchData() {
        const { data } = await supabase.from('medicineTracker').select().order('id', { ascending: false });
        return data;
    }

    const [days] = createResource(fetchData);
    document.title = 'Meds - Joseph Abell'
    return (
        <DefaultLayout customBackground={true}>
            <div style={{
                width: '100%',
                height: 'calc(100vh - 107px)',
                background: '#333',
                position: 'relative'
            }}>
                {days() && (<SVG
                    days={days}
                    style={{
                        width: '100%',
                        height: `${days().length * 3 * 10}px`,

                    }}
                />)}
                <div class="container meds-container" style={{ position: 'absolute', 'z-index': 1, left: '50vw', 'margin-left': '-25vw', 'margin-top': '40px', 'border': '2px solid #333' }}>
                    <h1>Medicine Tracker</h1>

                    <p>Each of these lines in the background show me successfully taking my diabetes medication. Yellow is for breakfast, blue is for lunch, and red is for dinner. If there are any black gaps, it shows a time where I forgot to take my meds.</p>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HorizontalLinesSVG;