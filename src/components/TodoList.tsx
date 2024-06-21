import { ChangeEvent, useEffect, useRef } from 'react';
import xIcon from '../assets/icon-cross.svg';
import useWindowWide from '../hooks/useWindowWidth';

export interface Todo {
	id: number;
	todo: string;
	isCompleted: boolean;
}

interface Props {
	todos: Todo[];
	theme: string;
	onFilter: (value: string) => void;
	currentFilter: string;
	onClear: () => void;
	onRemoveTodo: (id: number) => void;
	onToggleTodo: (id: number, isChecked: boolean) => void;
	count: number;
}

const TodoList = ({
	todos,
	theme,
	onFilter,
	currentFilter,
	onClear,
	onRemoveTodo,
	onToggleTodo,
	count,
}: Props) => {
	const isWideScreen = useWindowWide(480);

	const themeColor = theme == 'dark' ? 'bg-vDarkDesBlue' : 'bg-lightGray';

	useEffect(() => {
		const root = document.documentElement;
		root?.style.setProperty(
			'--chkBgColor',
			theme == 'dark' ? 'hsl(235, 24%, 19%)' : 'hsl(0, 0%, 98%)'
		);
	}, [theme]);


	const hoverClass = `${
		theme == 'dark' ? 'hover:text-lightGray' : 'hover:text-vDarkGreyBlue'
	}`;

	const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
		const todoCompleted = e.target.checked;
		console.log(e.target.checked);
		onToggleTodo(id, todoCompleted);
	};


	if (todos.length == 0) return <p></p>;
	return (
		<>
			<div
				className={`rounded shadow-sm relative transition duration-150 mt-6 ${themeColor}`}>
				{currentFilter == 'all'
					? todos.map(({ id, todo, isCompleted }) => (
							<label
								key={id}
								className={`container w-full outline-none p-4 pt-5 pl-16 bg-transparent border-b-[1px] border-b-darkGreyBlueD ${
									isCompleted ? 'line-through text-darkGreyBlue' : ''
								}`}>
								{todo}
								<input
									onChange={(e) => handleChange(e, id)}
									type='checkbox'
									name='checkTodo'
									checked={isCompleted}
								/>
								<span className='checkmark transition duration-150'></span>
								<img
									className='absolute right-5 top-[36%]'
									src={xIcon}
									alt='remove todo'
									onClick={() => onRemoveTodo(id)}
								/>
							</label>
					  ))
					: currentFilter == 'active'
					? todos
							.filter((todo) => todo.isCompleted == false)
							.map(({ id, todo, isCompleted }) => (
								<label
									key={id}
									className={`container w-full outline-none p-4 pt-5 pl-16 bg-transparent border-b-[1px] border-b-darkGreyBlueD ${
										isCompleted ? 'line-through text-darkGreyBlue' : ''
									}`}>
									{todo}
									<input
										onChange={(e) => handleChange(e, id)}
										type='checkbox'
										name='checkTodo'
										checked={isCompleted}
									/>
									<span className='checkmark transition duration-150'></span>
									<img
										className='absolute right-5 top-[36%]'
										src={xIcon}
										alt='remove todo'
										onClick={() => onRemoveTodo(id)}
									/>
								</label>
							))
					: todos
							.filter((todo) => todo.isCompleted == true)
							.map(({ id, todo, isCompleted }) => (
								<label
									key={id}
									className={`container w-full outline-none p-4 pt-5 pl-16 bg-transparent border-b-[1px] border-b-darkGreyBlueD ${
										isCompleted ? 'line-through text-darkGreyBlue' : ''
									}`}>
									{todo}
									<input
										onChange={(e) => handleChange(e, id)}
										type='checkbox'
										name='checkTodo'
										checked={isCompleted}
									/>
									<span className='checkmark transition duration-150'></span>
									<img
										className='absolute right-5 top-[36%]'
										src={xIcon}
										alt='remove todo'
										onClick={() => onRemoveTodo(id)}
									/>
								</label>
							))}

				{isWideScreen && todos ? (
					<div
						className={`footer py-4 px-3 text-sm bg-transparent font-medium text-darkGreyBlueD flex items-center justify-between`}>
						<p className='itemCount'>{count} items left</p>

						<div className='sortCtn flex items-center gap-x-2'>
							<p
								onClick={() => onFilter('all')}
								className={`${hoverClass} ${
									currentFilter == 'all' && 'active'
								}`}>
								All
							</p>
							<p
								onClick={() => onFilter('active')}
								className={`${hoverClass} ${
									currentFilter == 'active' && 'active'
								}`}>
								Active
							</p>
							<p
								onClick={() => onFilter('completed')}
								className={`${hoverClass} ${
									currentFilter == 'completed' && 'active'
								}`}>
								Completed
							</p>
						</div>

						<p className={hoverClass} onClick={onClear}>
							Clear Completed
						</p>
					</div>
				) : (
					<div>
						<div
							className={`footer py-4 px-3 text-sm bg-transparent font-medium text-darkGreyBlueD flex items-center justify-between`}>
							<p className='itemCount'>{count} items left</p>

							<p className={hoverClass} onClick={onClear}>
								Clear Completed
							</p>
						</div>
					</div>
				)}
			</div>

			{!isWideScreen && todos && (
				<div
					className={`sortCtn footer flex items-center gap-x-5 rounded shadow-sm p-4 justify-center text-darkGreyBlueD transition duration-150 mt-6 ${themeColor} `}>
					<p
						onClick={() => onFilter('all')}
						className={`${hoverClass} ${currentFilter == 'all' && 'active'}`}>
						All
					</p>
					<p
						onClick={() => onFilter('active')}
						className={`${hoverClass} ${
							currentFilter == 'active' && 'active'
						}`}>
						Active
					</p>
					<p
						onClick={() => onFilter('completed')}
						className={`${hoverClass} ${
							currentFilter == 'completed' && 'active'
						}`}>
						Completed
					</p>
				</div>
			)}
		</>
	);
};

export default TodoList;
