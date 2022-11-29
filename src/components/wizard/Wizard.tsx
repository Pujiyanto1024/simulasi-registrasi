import { FC } from "react";

interface WizardProps {
	icon?: React.ReactNode,
	title: string,
	active?: boolean,
	onClick: () => void
}

const Wizard: FC<WizardProps> = ({ icon, title, active=false, onClick }) => {
	return (
		<span onClick={onClick} className={`w-full cursor-pointer bg-white rounded-md shadow-lg flex transform transition-all duration-200 flex-none border-l-[6px]  ${!active ? ' border-l-green-20' : 'border-l-primary-20'}`}>
			<div className={` basis-1/4 lg:basis-1/5 py-5 flex justify-center transform transition-all duration-200  items-center ${!active ? ' text-green-20 bg-green-80 bg-opacity-30' : 'text-primary-20 bg-secondary-80 bg-opacity-30'}`}>
				{icon}
			</div>
			<div className=" basis-3/4 lg:basis-4/5 flex justify-start items-center text-sm md:text-base">
				<p className={`${active ? 'text-primary-20' : 'text-green-20'} font-semibold ml-2`}>{title}</p>
			</div>
		</span>
	)
};

export default Wizard;