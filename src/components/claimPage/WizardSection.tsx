import React, { FC } from "react";
import { Wizard } from "../";

interface WizardSectionProps {
	changeTab: (tab: number) => void,
	tabActive: number
}

const WizardSection: FC<WizardSectionProps> = ({ changeTab, tabActive }) => {
	return (
		<div className="w-full flex gap-x-5 gap-y-5 mt-5 flex-nowrap overflow-x-auto">
			<div className=" basis-1/2 lg:basis-1/3 flex-shrink-0 lg:flex-shrink">
				<Wizard
					icon={<i className="fa-solid fa-address-card text-base md:text-2xl"></i>}
					title="Formulir Pendaftaran"
					onClick={() => changeTab(1)}
					active={tabActive === 1}
				/>
			</div>
			<div className="basis-1/2 flex-shrink-0 lg:basis-1/3 lg:flex-shrink">

				<Wizard
					icon={<i className="fa-regular fa-image text-base md:text-2xl"></i>}
					title="Unggah Identitas"
					onClick={() => changeTab(2)}
					active={tabActive === 2}
				/>
			</div>
			<div className="basis-1/2 lg:basis-1/3 flex-shrink-0 lg:flex-shrink">

				<Wizard
					icon={<i className="fa-solid fa-clipboard-check text-base md:text-2xl"></i>}
					title="Selesai"
					onClick={() => changeTab(3)}
					active={tabActive === 3}
				/>
			</div>
		</div>
	)
};

export default WizardSection;