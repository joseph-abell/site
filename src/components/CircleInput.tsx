import { createSignal, createEffect } from 'solid-js';
import { Pie } from 'solid-chartjs';
import './CircleInput.scss';

const CircleInput = (props: any) => {
    const [angle, setAngle] = createSignal(0);
    const [color, setColor] = createSignal('green');

    createEffect(() => {
        if (angle() < 90) setColor('red');
        else if (angle() < 140) setColor('yellow');
        else if (angle() < 220) setColor('green');
        else if (angle() < 260) setColor('yellow');
        else {
            setColor('red');
        }
    });

    createEffect(() => {
        setAngle(props.value());
    })

    const handleMouseMove = (event: any) => {
        const { target } = event;
        var { left, top, width, height } = target.getBoundingClientRect();       
        const x = event.clientX - (left + width / 2);
        const y = event.clientY - (top + height / 2);
        const newAngle = x && y ? Math.atan2(y, x) * (180 / Math.PI) + 180 : props.value();
        setAngle(newAngle);
    };

    const handleClick = () => {
        props.setValue(angle())
    }

    return (
        <div style={{ transform: 'rotate(270deg)', display: 'inline-block'}} onMouseMove={handleMouseMove} onClick={handleClick}>
            <Pie
                data={{ labels: ['Calculated', 'Remaining'], datasets: [{ data: [props.value(), 360 - props.value()], backgroundColor: [color(), 'lightgray'] }] }} // Dynamic data for the pie chart
                options={{ responsive: false, animation: false }}
                width={200}
                height={200}
            />
        </div>
    );
};

export default CircleInput;
