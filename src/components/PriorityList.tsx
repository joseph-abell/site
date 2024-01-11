import { For } from 'solid-js';

const PriorityList = (props: any) => {
  return (
    <div>
        <h2>Suggested Priority Order</h2>
        <ul>
            <For each={props.priorities().sort((a: any, b: any) => (b.x * b.y) - (a.x * a.y))}>
                {(priority) => (
                    <li>
                        {priority.label}

                        <button style={{'margin-left': '10px'}} onClick={() => props.markAsDone(priority.id)}>Hide</button>
                    </li>
                )}
            </For>
        </ul>
    </div>

  );
};

export default PriorityList;
