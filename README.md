# React official documentation

![App Screenshot](/src/assets/s1.png)

```javascript
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
```
