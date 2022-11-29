import React, { FC, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string,
	label?: string | null,
	error?: string | null,
	required: boolean,
	type: "password" | "text" | "email",
	textSize?: 'text-sm' | 'text-base' | 'text-lg' | null
}

const InputText: FC<TextInputProps> = ({ name, label, error, required, type = "text", textSize = "text-sm", ...rest }) => {
	return (
		<div className=" w-full flex flex-col">
			<label
				htmlFor={name}
				className={`text-sm text-slate-500 ${error ? "text-red-500" : ""
					}`}
			>
				{label}
				<span className={`${required ? "text-red-600" : ""}`}>
					{label ? (required ? "*" : "") : ""}
				</span>
			</label>
			<input
				type={type}
				name={name}
				className={`w-full mt-2 outline-none px-1 py-[6px] border  bg-transparent ${textSize} appearance-none rounded  transition-all duration-150  ${error ? 'border-red-500 focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-30' : 'border-gray-400 focus:border-primary-first focus:ring focus:ring-primary-first focus:ring-opacity-30'}`}
				{...rest}
			/>
			<span className=" text-xs text-red-500 mt-1">{error}</span>
		</div>
	);
};

export default InputText;