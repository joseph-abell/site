import { createSignal } from 'solid-js';
import { supabase } from '../helpers';

const AddPriority = (p: any) => {
  const [label, setLabel] = createSignal('');
  const [importance, setImportance] = createSignal(0);
  const [urgency, setUrgency] = createSignal(0);

  const addData = async (label: string, importance: number, urgency: number) => {
    const { data, error } = await supabase
      .from('priorities')
      .insert([{ name: label, importance, urgency }]);

    if (error) {
      console.error('Error adding data:', error);
    }

    p.refreshData()
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add data to the "priorities" table
    await addData(label(), importance(), urgency());
    // Clear the form
    setLabel('');
    setImportance(0);
    setUrgency(0);
  };

  return (
    <div>
      <h2>Add Priority</h2>
    <form onSubmit={handleSubmit}>
      <div style={{'margin-bottom': '20px'}}>
        <label for="label" style={{display: 'block'}}>Label:</label>
        <input type="text" id="label" value={label()} onInput={(e) => setLabel(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="importance" style={{display: 'block'}}>Importance:</label>
        <input type="number" id="importance" value={importance()} onInput={(e: any) => setImportance(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="urgency" style={{display: 'block'}}>Urgency:</label>
        <input type="number" id="urgency" value={urgency()} onInput={(e: any) => setUrgency(e.target.value)} />
      </div>
      <button type="submit">Add Priority</button>
    </form>
    </div>
  );
};

export default AddPriority;
