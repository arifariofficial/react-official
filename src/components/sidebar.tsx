import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface SidebarProps {
	className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
	return (
		<div className={cn(className)}>
			<h1 className="font-bold mb-4 mt-2 text-center w-full">Menu</h1>
			<Button variant="outline" className="w-full">
				<a href="#valuesWithRef">Referencing values with Refs</a>
			</Button>
			<Button variant="outline" className="w-full">
				<a href="#manipulatingDom">Manipulating the DOM with Refs</a>
			</Button>
		</div>
	);
};
export default Sidebar;
