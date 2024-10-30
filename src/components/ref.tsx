import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function CounterWithState() {
	const [count, setCount] = useState(0);

	function handleClick() {
		setCount((prevCount) => prevCount + 1);
	}

	return (
		<Button variant="outline" type="button" onClick={handleClick}>
			You clicked {count} times.
		</Button>
	);
}
function CounterWithRef() {
	const countRef = useRef(0);

	function handleClick() {
		// This doesn't re-render the component!
		countRef.current = countRef.current + 1;
	}

	return (
		<Button variant="outline" type="button" onClick={handleClick}>
			You clicked {countRef.current} times.
		</Button>
	);
}

function StopWatch() {
	const [startTime, setStartTime] = useState<number | null>(null);
	const [now, setNow] = useState<number | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	function handleStart() {
		setStartTime(Date.now());
		setNow(Date.now());

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		intervalRef.current = setInterval(() => {
			setNow(Date.now());
		}, 10);
	}

	function handleStop() {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	}

	let secondsPassed = 0;

	if (startTime != null && now !== null) {
		secondsPassed = (now - startTime) / 1000;
	}

	return (
		<>
			<h1>Time passed : {secondsPassed.toFixed(3)}</h1>
			<Button variant="outline" type="button" onClick={handleStart}>
				Start
			</Button>
			<Button variant="outline" type="button" onClick={handleStop} className="mx-4">
				Stop
			</Button>
		</>
	);
}

// Fix a broken chat input
function Chat() {
	const [text, setText] = useState("");
	const [isSending, setIsSending] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	function handleSend() {
		setIsSending(true);

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			alert("Message sent!");
			setIsSending(false);
		}, 3000);
	}
	function handleUndo() {
		setIsSending(false);
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	return (
		<div className="flex flex-col w-[200px] mx-auto gap-2">
			<Input
				type="text"
				placeholder="Type your message here"
				disabled={isSending}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<Button variant="outline" disabled={isSending} onClick={handleSend}>
				{isSending ? "Sending..." : "Send"}
			</Button>
			{isSending && (
				<Button variant="outline" onClick={handleUndo}>
					Undo
				</Button>
			)}
		</div>
	);
}

// Fix a component failing to re-render
function Toggle() {
	const [isOn, setIsOn] = useState(false);

	return (
		<Button
			variant="outline"
			onClick={() => {
				setIsOn(!isOn);
			}}
		>
			{isOn ? "On" : "Off"}
		</Button>
	);
}

// Fix debouncing
function DebouncedButton({
	onClick,
	children,
}: {
	onClick: () => void;
	children: React.ReactNode;
}) {
	let timeoutID;
	return (
		<Button
			variant="outline"
			onClick={() => {
				clearTimeout(timeoutID);
				timeoutID = setTimeout(() => {
					onClick();
				}, 1000);
			}}
		>
			{children}
		</Button>
	);
}

function Dashboard() {
	return (
		<div className="flex gap-2 justify-center w-full">
			<DebouncedButton onClick={() => alert("Spaceship launched!")}>
				Launch the spaceship
			</DebouncedButton>
			<DebouncedButton onClick={() => alert("Soup boiled!")}>
				Boil the soup
			</DebouncedButton>
			<DebouncedButton onClick={() => alert("Lullaby sung!")}>
				Sing a lullaby
			</DebouncedButton>
		</div>
	);
}

const Ref = () => {
	return (
		<div className="flex flex-col gap-8">
			<section>
				<h1>Counter with State</h1>
				<CounterWithState />
			</section>
			<section>
				<h1>Counter with ref</h1>
				<p>This does't re-render the component</p>
				<CounterWithRef />
			</section>
			<section>
				<h1>Stop watch</h1>
				<StopWatch />
			</section>
			<section>
				<h1>Fix a broken chat input</h1>
				<Chat />
			</section>
			<section>
				<h1>Fix a component failing to re-render</h1>
				<Toggle />
			</section>
			<section>
				<h1>Fix debouncing</h1>
				<Dashboard />
			</section>
		</div>
	);
};
export default Ref;
