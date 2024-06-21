import { FormEvent, useRef } from "react";

interface Props {
    onSubmit: (todo: string) => void;
    theme: string;
}


const TodoInput = ({ onSubmit, theme }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const themeColor = theme == 'dark' ? 'vDarkDesBlue' : 'lightGray'
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        inputRef.current?.value && onSubmit(inputRef.current.value)
        formRef.current?.reset();
    }
    return (
        <form ref={formRef} className={`rounded shadow-sm relative transition duration-150 bg-${themeColor}`} onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" className="w-full outline-none p-4 pl-16 bg-transparent" placeholder="Create a new todo..." maxLength={60} minLength={3} />
            <div className={`circle w-6 h-6 border rounded-full border-${themeColor} absolute top-[26%] left-5`}></div>
        </form>
    );
};

export default TodoInput;