import { forwardRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { flushSync } from "react-dom";

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
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	return (
		<Button
			variant="outline"
			onClick={() => {
				if (timeoutRef.current !== null) {
					clearTimeout(timeoutRef.current);
				}
				timeoutRef.current = setTimeout(() => {
					onClick();
				}, 1000);
			}}
		>
			{children}
		</Button>
	);
}

// Read the latest state

function ChatLatestState() {
	const [text, setText] = useState("");
	const textRef = useRef(text);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setText(e.target.value);
		textRef.current = e.target.value;
	}

	function handleSend() {
		setTimeout(() => {
			alert("Sending: " + textRef.current);
		}, 4000);
	}

	return (
		<div className="flex flex-col justify-center">
			<div className="w-[400px] mx-auto flex flex-col gap-2">
				<Input value={text} onChange={handleChange} placeholder="Type here" />
				<Button variant="outline" onClick={handleSend}>
					Send
				</Button>
			</div>
		</div>
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
// Focusing a text input
function Form() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleClick() {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	return (
		<div>
			<div className="w-[400px] mx-auto gap-2 flex flex-col">
				<Input ref={inputRef} />
				<Button onClick={handleClick} variant="outline">
					Focus the input
				</Button>
			</div>
		</div>
	);
}

// Scrolling to an element
function CatFriends() {
	const firstCatRef = useRef<HTMLImageElement | null>(null);
	const secondCatRef = useRef<HTMLImageElement | null>(null);
	const thirdCatRef = useRef<HTMLImageElement | null>(null);

	function handleScrollToFirstCat() {
		if (firstCatRef.current) {
			firstCatRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}
	function handleScrollToSecondCat() {
		if (secondCatRef.current) {
			secondCatRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}
	function handleScrollToThirdCat() {
		if (thirdCatRef.current) {
			thirdCatRef.current.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}
	return (
		<div>
			<nav>
				<Button variant="outline" onClick={handleScrollToFirstCat}>
					Neo
				</Button>
				<Button variant="outline" onClick={handleScrollToSecondCat}>
					Millie
				</Button>
				<Button variant="outline" onClick={handleScrollToThirdCat}>
					Bella
				</Button>
			</nav>
			<div className="flex relative justify-center overflow-x-scroll w-[400px] border h-[200px] mx-auto">
				<ul className="absolute flex space-x-4  w-screen left-[200px]">
					<li>
						<img src="https://placecats.com/neo/300/200" alt="Neo" ref={firstCatRef} />
					</li>
					<li>
						<img
							src="https://placecats.com/millie/200/200"
							alt="Millie"
							ref={secondCatRef}
						/>
					</li>
					<li>
						<img
							src="https://placecats.com/bella/199/200"
							alt="Bella"
							ref={thirdCatRef}
						/>
					</li>
				</ul>
			</div>
		</div>
	);
}

// Scrolling to an element in map
function CatFriendsMap() {
	const itemsRef = useRef<Map<string, HTMLLIElement> | null>(null);
	const [catList] = useState(setupCatList);

	function scrollToCat(cat: string) {
		const map = getMap();
		if (!map) return;
		const node = map.get(cat);

		if (node) {
			node.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}

	function getMap() {
		if (!itemsRef.current) {
			itemsRef.current = new Map();
		}
		return itemsRef.current;
	}

	function setupCatList() {
		const catList = [];
		for (let i = 0; i < 10; i++) {
			catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
		}

		return catList;
	}

	return (
		<>
			<nav>
				<Button variant="outline" onClick={() => scrollToCat(catList[0])}>
					Neo
				</Button>
				<Button variant="outline" onClick={() => scrollToCat(catList[5])}>
					Millie
				</Button>
				<Button variant="outline" onClick={() => scrollToCat(catList[9])}>
					Bella
				</Button>
			</nav>
			<div className="flex relative justify-center overflow-x-scroll w-[400px] border h-[200px] mx-auto">
				<ul className="absolute flex space-x-4 h-full border w-screen left-[200px]">
					{catList.map((cat) => (
						<li
							className="flex items-center justify-center  shrink-0"
							key={cat}
							ref={(node) => {
								const map = getMap();
								if (node) {
									map.set(cat, node);
								} else {
									map.delete(cat);
								}
							}}
						>
							<img
								title="picture"
								src={cat}
								className="object-contain w-auto h-full border"
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

// Accessing another component's DOM nodes
const MyInput = forwardRef<HTMLInputElement, React.ImgHTMLAttributes<HTMLInputElement>>(
	(props, ref) => {
		return <Input ref={ref} {...props} />;
	}
);

function MyForm() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleClick() {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}

	return (
		<div className="flex flex-col w-[400px] mx-auto gap-2">
			<MyInput ref={inputRef} />
			<Button variant="outline" onClick={handleClick}>
				Focus the input
			</Button>
		</div>
	);
}

// Flushing state updates synchronously with flushSync

// Without flushSync
let nextId = 0;
const initialTodos: { id: number; text: string }[] = [];
for (let i = 0; i < 20; i++) {
	initialTodos.push({
		id: nextId++,
		text: "Todo #" + (i + 1),
	});
}

function TodoListWithOutFlushSync() {
	const listRef = useRef<HTMLUListElement | null>(null);
	const [text, setText] = useState("");
	const [todos, setTodos] = useState<{ id: number; text: string }[]>(initialTodos);

	function handleAdd() {
		const newTodo = { id: nextId++, text: text };
		setText("");
		setTodos([...todos, newTodo]);
		if (listRef.current?.lastChild instanceof HTMLElement) {
			listRef.current.lastChild.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}

	return (
		<div className="flex flex-col w-[400px] mx-auto gap-2">
			<Button variant="outline" onClick={handleAdd}>
				Add
			</Button>
			<Input value={text} onChange={(e) => setText(e.target.value)} />
			<ul ref={listRef}>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</div>
	);
}

// With flushSync
function TodoList() {
	const listRef = useRef<HTMLUListElement | null>(null);
	const [text, setText] = useState("");
	const [todos, setTodos] = useState<{ id: number; text: string }[]>(initialTodos);

	function handleAdd() {
		const newTodo = { id: nextId++, text: text };

		flushSync(() => {
			setText("");
			setTodos([...todos, newTodo]);
		});

		if (listRef.current?.lastChild instanceof HTMLElement) {
			listRef.current.lastChild.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
			});
		}
	}

	return (
		<div className="flex flex-col w-[400px] mx-auto gap-2">
			<Button variant="outline" onClick={handleAdd}>
				Add
			</Button>
			<Input value={text} onChange={(e) => setText(e.target.value)} />
			<ul ref={listRef}>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.text}</li>
				))}
			</ul>
		</div>
	);
}

// Play and pause the video
function VideoPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const ref = useRef<HTMLVideoElement | null>(null);

	function handleClick() {
		const nextIsPlaying = !isPlaying;
		setIsPlaying(nextIsPlaying);
		if (ref.current) {
			if (nextIsPlaying) {
				ref.current.play();
			} else {
				ref.current.pause();
			}
		}
	}

	return (
		<div className="flex flex-col w-[400px] mx-auto gap-2">
			<Button variant="outline" onClick={handleClick}>
				{isPlaying ? "Pause" : "Play"}
			</Button>
			<video
				ref={ref}
				width="250"
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			>
				<source
					src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
					type="video/mp4"
				/>
			</video>
		</div>
	);
}

//  Focus the search field
function Page() {
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const handleButton = () => {
		if (searchInputRef.current) {
			searchInputRef.current.focus();
		}
	};
	return (
		<div className="flex flex-col w-[400px] mx-auto gap-2">
			<nav>
				<Button variant="outline" onClick={handleButton}>
					Search
				</Button>
			</nav>
			<Input placeholder="Looking for something?" ref={searchInputRef} />
		</div>
	);
}

const Ref = () => {
	return (
		<div className="flex flex-col gap-8 justify-center items-center">
			<h1 id="valuesWithRef" className="text-lg font-bold">
				Referencing values with Refs
			</h1>
			<section>
				<h1>Counter with State</h1>
				<CounterWithState />
			</section>
			<section>
				<h1>Counter with ref</h1>
				<p>This doesn't re-render the component</p>
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
			<section>
				<h1>Read the latest state</h1>
				<ChatLatestState />
			</section>
			<h1 id="manipulatingDom" className="text-lg font-bold mt-10">
				Manipulating the DOM with Refs
			</h1>
			<section>
				<h1> Focusing a text input</h1>
				<Form />
			</section>
			<section>
				<h1>Scrolling to an element</h1>
				<CatFriends />
			</section>
			<section>
				<h1>Scrolling to an element in map</h1>
				<CatFriendsMap />
			</section>
			<section>
				<h1>Accessing another component’s DOM nodes </h1>
				<MyForm />
			</section>
			<section>
				<h1>Flushing state updates synchronously with flushSync</h1>
				<h2 className="my-4">Without flushSync</h2>
				<TodoListWithOutFlushSync />
			</section>
			<section>
				<h2 className="mb-4">With flushSync</h2>
				<TodoList />
			</section>
			<section>
				<h1>Play and pause the video</h1>
				<VideoPlayer />
			</section>
			<section>
				<h1> Focus the search field</h1>
				<Page />
			</section>
		</div>
	);
};
export default Ref;
