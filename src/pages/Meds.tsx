import { createComputed, createResource, createSignal } from 'solid-js'
import DefaultLayout from "../layouts/DefaultLayout";
import { supabase } from '../helpers';


const Meds = () => {
    async function fetchData() {
        const { data } = await supabase.from('medicineTracker').select().order('id', { ascending: false });
        return data;
    }

    const [days] = createResource(fetchData);
    const [daysWithMissingMeds, setDaysWithMissingMeds] = createSignal(0);
    const [takenMedsToday, setTakenMedsToday] = createSignal(false);

    createComputed(() => {
        if (days()) {
            setDaysWithMissingMeds(days().filter(i => {
                if (i.id === new Date().toISOString().split('T')[0]) return false;
                return i.breakfast === false || i.lunch === false || i.dinner === false;
            }).length)

            const today = days().find(i => i.id === new Date().toISOString().split('T')[0])
            if (!today) setTakenMedsToday(false);
            else if (today.breakfast === true && today.lunch === true && today.dinner === true) {
                setTakenMedsToday(true);
            } else {
                setTakenMedsToday(false);
            }
        }
    })

    document.title = 'Meds - Joseph Abell'

    return (
        <DefaultLayout>
            <div class='container'>
                <h1>Medicine Tracker</h1>

                <dl>
                    <dt>Total Days:</dt>
                    <dd>{days?.() && days?.().length}</dd>

                    <dt>Days with missing meds:</dt>
                    <dd>{daysWithMissingMeds()}</dd>

                    <dt>Taken all of the meds today?</dt>
                    <dd>{takenMedsToday() ? 'Yes' : 'Not Yet'}</dd>
                </dl>
            </div>
        </DefaultLayout>
    );
};

export default Meds;