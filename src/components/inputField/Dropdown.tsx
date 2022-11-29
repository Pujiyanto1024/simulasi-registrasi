import React, { FC, SelectHTMLAttributes } from 'react';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
	name: string,
	label: string,
	error?: string | null,
	required: boolean,
	options: Array<any>,
	keyValue: string,
	keyLabel: string,
	labelPlaceholder?: string | null,
	value?: string | number | readonly string[],
	optional?: boolean
}

const Dropdown: FC<DropdownProps> = ({ name, value, label, error, required, options, keyValue, keyLabel, labelPlaceholder, optional=false, ...rest }) => {
	return (
		<div className="w-full flex flex-col">
			<label htmlFor={name} className={`text-sm text-slate-500 ${error ? "text-red-500" : ""
					}`}>
				{label ?? ''}
				<span className={`${required ? 'text-red-600' : ''}`}>{label ? required ? '*' : '' : ''}</span>
				{ optional ? <span className=" italic text-sm text-neutral-70 ml-1">(optional)</span> : null }
			</label>
			<select
				name={name}
				className={`w-full mt-1 outline-none px-3 py-2 border rounded border-neutral-80 bg-transparent appearance-none transition-all duration-200 focus:border-primary-first focus:ring focus:ring-primary-first focus:ring-opacity-30 ${error ? 'border-red-500' : ''} text-sm`}
				value={value ?? 'default'}
				{...rest}
			>
				<option value="default" disabled>{labelPlaceholder}</option>
				{options.map((item, index) =>
					<option key={"idx" + index} value={item[keyValue]}>
						{item[keyLabel]}
					</option>
				)}
			</select>
			<span className=" text-xs text-red-500 mt-1">{error}</span>
		</div>
	)
};

export default Dropdown;