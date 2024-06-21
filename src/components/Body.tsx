import { ReactNode } from 'react';

interface Props {
	bgColor: string;
	getBgImg: () => void;
	children: ReactNode;
}

const Body = ({ bgColor, getBgImg, children }: Props) => {
	const bgImg = getBgImg();
	return (
		<main
			className='body'
			style={{ backgroundColor: bgColor, backgroundImage: `url(${bgImg})` }}>
			{children}
		</main>
	);
};

export default Body;
