import DefaultLayout from "../layouts/DefaultLayout";
import { createSignal, onMount } from 'solid-js';
import { supabase } from '../helpers';
import CircleInput from "../components/CircleInput";

const MedicineTracker = () => {
  const [id, setId] = createSignal(new Date().toLocaleString().split(',')[0].split('/').reverse().join('-'));
  const [idInput, setIdInput] = createSignal('');
  const [breakfast, setBreakfast] = createSignal(false);
  const [lunch, setLunch] = createSignal(false);
  const [dinner, setDinner] = createSignal(false);
  const [disabled, setDisabled] = createSignal(false);

  const fetchMedicineIntake = async () => {

    const { data, error } = await supabase
      .from('medicineTracker')
      .select()
      .eq('id', id())
      .maybeSingle();

      console.log('fetchMedicineIntake', id(), data);
    if (error) {
      console.error('Error fetching medicine intake:', error);
    } else {
      if (data) {
        const { breakfast, lunch, dinner, carbs } = data;
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
        id: id(),
        breakfast: breakfast(),
        lunch: lunch(),
        dinner: dinner(),
        carbs: 0,
      },
    ]).select();
    setDisabled(false);

    const url = `${document.location.origin}/doodles/meds`;
    document.location = url;
  };

  const onIdInput = (e: any) => {
    setIdInput(e.currentTarget.value);
  }

  const onIdSubmit = (e: any) => {
    e.preventDefault();

    setId(idInput());
    fetchMedicineIntake();
  }

  // Return your component UI here
  return (
    <DefaultLayout>
      <h1>{id()}</h1>

      <form onSubmit={onIdSubmit}>
        <input type='text' value={idInput()} onInput={onIdInput} />
        <button type='submit'>Go</button>
      </form>

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