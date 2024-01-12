import { Show, createEffect, createSignal } from 'solid-js';
import { supabase } from '../helpers';

const AddPriority = (p: any) => {
  const [label, setLabel] = createSignal('');
  const [deadline, setDeadline] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [importance, setImportance] = createSignal(0);
  const [urgency, setUrgency] = createSignal(0);

  const upsertData = async (label: string, importance: number, urgency: number, description: string, deadline: string) => {
    let err;
    if (p.id()) {
      const { error } = await supabase
        .from('priorities')
        .upsert([{ id: p.id(), name: label, importance, urgency, description, deadline }]);
      err = error;
    } else {
      const { error } = await supabase
        .from('priorities')
        .insert([{ name: label, importance, urgency, description, deadline }]);
      err = error;
    }

    if (err) {
      console.error('Error adding data:', err);
    }

    p.refreshData()
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Add data to the "priorities" table
    await upsertData(label(), importance(), urgency(), description(), deadline());
    // Clear the form
    setLabel('');
    setDeadline('');
    setDescription('');
    setImportance(0);
    setUrgency(0);
    p.clearId();
  };

  const clear = () => {
    setLabel('');
    setDeadline('')
    setDescription('')
    setImportance(0)
    setUrgency(0)
    p.clearId()
  }

  createEffect(async () => {
    if (p.id()) {
      const {data} = await supabase.from('priorities').select('*').eq('id', p.id()).maybeSingle();
      if (data) {
        setLabel(data.name);
        setDeadline(data.deadline);
        setDescription(data.description);
        setImportance(data.importance);
        setUrgency(data.urgency);
      }
    }
  })

  return (
    <div>
      <Show when={!!p.id()}><h2>Edit Priority</h2></Show>
      <Show when={!p.id()}><h2>Add Priority</h2></Show>
    <form onSubmit={handleSubmit}>
      <div style={{'margin-bottom': '20px'}}>
        <label for="label" style={{display: 'block'}}>Label:</label>
        <input type="text" id="label" value={label()} onInput={(e) => setLabel(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="description" style={{display: 'block'}}>Description:</label>
        <textarea id="description" value={description()} onInput={(e) => setDescription(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="deadline" style={{display: 'block'}}>Deadline:</label>
        <input type="text" id="description" value={deadline()} onInput={(e) => setDeadline(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="importance" style={{display: 'block'}}>Importance:</label>
        <input type="number" id="importance" value={importance()} onInput={(e: any) => setImportance(e.target.value)} />
      </div>
      <div style={{'margin-bottom': '20px'}}>
        <label for="urgency" style={{display: 'block'}}>Urgency:</label>
        <input type="number" id="urgency" value={urgency()} onInput={(e: any) => setUrgency(e.target.value)} />
      </div>
      <Show when={!p.id()}>
        <button type="submit">Add Priority</button>
      </Show>
      
      <Show when={!!p.id()}>
      <button type="submit">Edit Priority</button>
        <button type='button' onClick={clear} style={{'margin-left': '10px'}}>Clear</button>
      </Show>
    </form>
    </div>
  );
};

export default AddPriority;
