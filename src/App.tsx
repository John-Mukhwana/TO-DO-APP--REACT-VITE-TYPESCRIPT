import { useEffect, useState } from 'react';
import TodoContainer from './components/TodoContainer';
import moonIcon from './assets/icon-moon.svg';
import sunIcon from './assets/icon-sun.svg';
import useWindowWide from './hooks/useWindowWidth';
import Body from './components/Body';
import bgImgMobileDark from './assets/bg-mobile-dark.jpg';
import bgImgMobileLight from './assets/bg-mobile-light.jpg';
import bgImgDesktopDark from './assets/bg-desktop-dark.jpg';
import bgImgDesktopLight from './assets/bg-desktop-light.jpg';
import TodoInput from './components/TodoInput';
import TodoList, { Todo } from './components/TodoList';
import './App.scss';



function App() {
	const [theme, setTheme] = useState('dark');
	const isWideScreen = useWindowWide(480);
	const [currentFilter, setCurrentFilter] = useState('all')
	const [todos, setTodos] = useState<Todo[]>([])
	const [todoLength, setTodoLength] = useState(0)
	
	
	const height = Number(localStorage.getItem('vh')) || 1

	const count = todos.filter(todo => todo.isCompleted === false).length

	useEffect(() => {
		const lsTheme = localStorage.getItem('theme') || 'dark';
		setTheme(lsTheme);

		const data = localStorage.getItem('todos')
		const storedTodos: Todo[] = data ? JSON.parse(data) : []
		console.log(storedTodos)
		storedTodos.length > 0 && setTodos(storedTodos)
	}, [])

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])
	

	useEffect(() => {
		const newHeight = height + 0.06
		const root = document.documentElement;
		root?.style.setProperty('--vh', `${newHeight}vh`);
		localStorage.setItem('vh', `${newHeight}`)
	}, [todoLength]);

	const toggleTheme = () => {
		let newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	const getBgImg = () => {
		let img;
		if (isWideScreen && theme === 'dark') {
			img = bgImgDesktopDark;
		} else if (isWideScreen && theme === 'light') {
			img = bgImgDesktopLight;
		} else if (!isWideScreen && theme === 'dark') {
			img = bgImgMobileDark;
		} else if (!isWideScreen && theme === 'light') {
			img = bgImgMobileLight;
		}

		return img;
	};

	const addTodo = (todo: string) => {
		const todoToAdd: Todo = { id: Date.now(), todo: todo, isCompleted: false }
		setTodos([todoToAdd, ...todos])
		setTodoLength(todos.length + 1)
	};

	const handleToggle = (id: number, isCompleted: boolean) => {
		setTodos(todos.map(todo => todo.id == id ? {...todo, isCompleted: isCompleted} : todo))
	}

	const handleDelete = (id: number) => {
		setTodos(todos.filter(todo => todo.id !== id))
	}

	const clearCompleted = () => {
		setTodos(todos.filter(todo => todo.isCompleted !== true))
	}

	return (
		<Body
			bgColor={theme == 'dark' ? 'hsl(235, 21%, 11%)' : 'hsl(236, 33%, 92%)'}
			getBgImg={() => getBgImg()}>
			<TodoContainer theme={theme}>
				<div className='flex justify-between items-center mb-10'>
					<h1 className='text-white text-3xl font-semibold tracking-[.25em]'>TODO</h1>
					{theme == 'dark' ? (
						<img
							className='lg:cursor-pointer'
							src={sunIcon}
							onClick={toggleTheme}
							alt='light mode icon'
						/>
					) : (
						<img
							className='lg:cursor-pointer'
							src={moonIcon}
							onClick={toggleTheme}
							alt='dark mode icon'
						/>
					)}
				</div>

				<TodoInput onSubmit={addTodo} theme={theme} />
				<TodoList
					count = {count}
					theme={theme}
					todos={todos}
					currentFilter={currentFilter}
					onFilter={(filter) => setCurrentFilter(filter)}
					onClear={() => clearCompleted()}
					onRemoveTodo={(id) => handleDelete(id)}
					onToggleTodo={(id, isCompleted) => handleToggle(id, isCompleted)}
				/>
			</TodoContainer>
		</Body>
	);
}

export default App;
