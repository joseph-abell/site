import DefaultLayout from "../layouts/DefaultLayout";
import { createSignal, onMount } from 'solid-js';
import { supabase } from '../helpers';

const MedicineTracker = () => {
  const id = new Date().toISOString().split('T')[0];
  const [breakfast, setBreakfast] = createSignal(false);
  const [lunch, setLunch] = createSignal(false);
  const [dinner, setDinner] = createSignal(false);
  const [disabled, setDisabled] = createSignal(false);

  const fetchMedicineIntake = async () => {
    const { data, error } = await supabase
      .from('medicineTracker')
      .select()
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching medicine intake:', error);
    } else {
      if (data) {
        const { breakfast, lunch, dinner } = data;
        setBreakfast(breakfast);
        setLunch(lunch);
        setDinner(dinner);
        setDisabled(false);
      }
    }
  };

  onMount(fetchMedicineIntake);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);

    await supabase.from('medicineTracker').upsert([
      {
        id,
        breakfast: breakfast(),
        lunch: lunch(),
        dinner: dinner(),
      },
    ]).select();
    setDisabled(false);

    const url = `${document.location.origin}/doodles/meds`;
    document.location = url;
  };

  // Return your component UI here
  return (
    <DefaultLayout>
        <h1>{id}</h1>
        <form onSubmit={onFormSubmit}>
            <p>
                <label>
                    <input type="checkbox" checked={breakfast()} onChange={() => setBreakfast(!breakfast())} />
                    Breakfast
                </label>
            </p>
        
            <p>
                <label>
                    <input type="checkbox" checked={lunch()} onChange={() => setLunch(!lunch())} />
                    Lunch
                </label>
            </p>
        
            <p>
                <label>
                    <input type="checkbox" checked={dinner()} onChange={() => setDinner(!dinner())} />
                    Dinner
                </label>
            </p>

            <p>
                <button type="submit" disabled={disabled()}>Submit</button>
            </p>
        </form>
    </DefaultLayout>
  );
};

export default MedicineTracker;