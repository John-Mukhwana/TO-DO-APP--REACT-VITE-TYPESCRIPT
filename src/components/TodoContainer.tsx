import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    theme: string;
}


const TodoContainer = ({children, theme}: Props) => {
    return (
        <div className={`text-left w-95% sm:px-5 max-w-lg mx-auto pt-10 md:pt-16 ${theme == 'dark' ? 'text-white' : 'text-vDarkGreyBlue'}`}>
            {children}
        </div>
    );
};

export default TodoContainer;