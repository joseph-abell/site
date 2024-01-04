import DefaultLayout from "../layouts/DefaultLayout";
import { createSignal, onMount } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const MedicineTracker = () => {
console.log(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const id = new Date().toISOString().split('T')[0];
  const [breakfast, setBreakfast] = createSignal(false);
  const [lunch, setLunch] = createSignal(false);
  const [dinner, setDinner] = createSignal(false);

  // Function to fetch and update the medicine intake from Supabase
  const fetchMedicineIntake = async () => {
    // Replace 'medicinetracker' with your actual table name in Supabase
    const { data, error } = await supabase
      .from('medicineTracker')
      .select()
      .eq('id', id)
      .maybeSingle(); // Filter by today's date

    if (error) {
      console.error('Error fetching medicine intake:', error);
    } else {
      // Update the signals with the fetched data or default to false
      if (data) {
        const { breakfast, lunch, dinner } = data;
        setBreakfast(breakfast);
        setLunch(lunch);
        setDinner(dinner);
      }
    }
  };

  // Fetch the medicine intake on component mount
  onMount(fetchMedicineIntake);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    console.log('submitting')
    // Replace 'medicinetracker' with your actual table name in Supabase
    const result = await supabase.from('medicineTracker').upsert([
      {
        id,
        breakfast: breakfast(),
        lunch: lunch(),
        dinner: dinner(),
      },
    ]).select();

    console.log(result);
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
                <button type="submit">Submit</button>
            </p>
        </form>
    </DefaultLayout>
  );
};

export default MedicineTracker;