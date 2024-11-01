import Ref from "./components/ref";
import Sidebar from "./components/sidebar";

function App() {
	return (
		<div className="flex flex-row h-screen">
			<div className="relative flex justify-center h-screen items-center w-[290px]">
				<Sidebar className="fixed left-0 top-0 items-center h-full gap-2 mx-auto border-r w-[290px] justify-center" />
			</div>
			<div className="relative flex-1 mx-10 mt-10 items-center justify-center">
				<Ref />
			</div>
		</div>
	);
}

export default App;
