import React, { FC, useState, useEffect, InputHTMLAttributes } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { FileAttributes } from "../../interface/RegisterInterface";

interface InputImageProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string,
	onRemove: () => void,
	error?: string | null,
	data: FileAttributes,
	required: boolean,
	acceptableText: string,
	maxSizeLabel: string
}

const InputImage: FC<InputImageProps> = ({ label, onRemove, error, data, required, acceptableText, maxSizeLabel, ...rest }) => {
	const [imgs, setImgs] = useState<string>('');
	// const [image, setImage] = useState<File | undefined>();

	useEffect(() => {
		if (data.dataFile) {
			setImgs(URL.createObjectURL(data.dataFile));
		}
	}, [data.dataFile]);
	
	// const onChange = (e:any) => {
	// 	const t = e?.target?.files ? e.target.files[0] : undefined;

	// 	setImage(t);

	// 	e.target.value = null
	// };

	const removeImage = () => {
		// setImage(undefined);
		onRemove();
		setImgs('');
	}
	return (
		<div className=" w-full">
			{data.dataFile && (

				<div className="w-full flex justify-center relative">
					<div onClick={removeImage} className="absolute top-3 right-3 cursor-pointer text-red-500 text-2xl z-10">
						<i className="fa-solid fa-trash"></i>
					</div>
					<TransformWrapper>
					{({ zoomIn, zoomOut, resetTransform }) => (
						<div>
							<div className=" absolute top-2 ml-2 z-10 flex flex-col gap-y-2">
								<button onClick={() => resetTransform()} className=" btn btn-circle btn-sm btn-success text-white normal-case text-xs">X</button>
								<button onClick={() => zoomIn()} className=" btn btn-circle btn-sm btn-success text-white">+</button>
								<button onClick={() => zoomOut()} className=" btn btn-circle btn-sm btn-success text-white">-</button>
							</div>
							<TransformComponent>
							<div className=" h-40 w-64 md:h-52 md:w-96 relative">
								<Image
									src={imgs}
									alt="Picture of the author"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						</TransformComponent>
						</div>
						)}
						
					</TransformWrapper>
				</div>
			)}
			<div className=" mt-5 p-5 border border-slate-400 rounded-lg w-full flex justify-center items-center">
				<input  id="test" name="test" type="file" className=" hidden w-full h-full" {...rest} />
				<label htmlFor="test" className=" cursor-pointer flex flex-col justify-center items-center">
					<i className="fa-solid fa-plus text-primary-30 text-3xl"></i>
					<p className=" mt-2 text-slate-400 font-semibold">{label}
					<span className={`${required ? "text-red-600" : ""}`}>
					{label ? (required ? "*" : "") : ""}
						</span></p>
					<div className="flex gap-x-2 text-slate-400 text-sm mt-2">
						<p className="">Maks. {maxSizeLabel}</p>
						<p className="">File: {acceptableText}</p>
					</div>
				</label>
			</div>
			<span className=" text-xs text-red-500 mt-1">{error}</span>
		</div>
	)
};

export default InputImage;