import React, { FC, TextareaHTMLAttributes } from "react";

interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>  {
	name: string,
	label?: string | null,
	error?: string | null,
	required?: boolean,
	optional?: boolean
}

const InputTextArea: FC<InputTextAreaProps> = ({ name, error, label, required=false, optional=false, ...rest }) => {
	return (
		<div className="w-full flex flex-col">
			<label htmlFor={name} className={`text-sm text-slate-500 ${error ? "text-red-500" : ""
					}`}>
				{label ?? ''}
				<span className={`${required ? 'text-red-600' : ''}`}>{label ? required ? '*' : '' : ''}</span>
				{ optional ? <span className=" italic text-sm text-neutral-70 ml-1">(optional)</span> : null }
			</label>
			<textarea
				name={name}
				className={`w-full mt-1 outline-none px-3 py-2 border rounded border-neutral-80 bg-transparent appearance-none transition-all duration-200 focus:border-primary-first focus:ring focus:ring-primary-first focus:ring-opacity-30 ${error ? 'border-red-500' : ''} text-sm`} {...rest}
			></textarea>
			<span className=" text-xs text-red-500 mt-1">{error}</span>
		</div>
	)
}

export default InputTextArea