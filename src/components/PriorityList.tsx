import { For } from 'solid-js';

const PriorityList = (props: any) => {
  return (
    <div>
        <h2>Suggested Priority Order</h2>
        <ul>
            <For each={props.priorities}>
                {(priority) => (
                    <li>
                        {priority.label}

                        <button style={{'margin-left': '10px'}} onClick={() => props.markAsDone(priority.id)}>Hide</button>
                        <button style={{'margin-left': '10px'}} onClick={() => props.editPriority(priority.id)}>Edit</button>
                    </li>
                )}
            </For>
        </ul>
    </div>

  );
};

export default PriorityList;
