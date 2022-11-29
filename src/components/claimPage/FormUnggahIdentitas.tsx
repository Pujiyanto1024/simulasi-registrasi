import React, { FC } from "react";
import { InputImage, InputText } from "..";
import { FileAttributes } from "../../interface/RegisterInterface";

interface FormIdentitasAttributes {
	ktp: FileAttributes,
	onRemove: () => void
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onBack: () => void,
	onSubmit: () => void,
	errorKtp: string
}

const FormUnggahIdentitas: FC<FormIdentitasAttributes> = ({ ktp, onRemove, onChange, onBack, onSubmit, errorKtp }) => {
	return (
		<div className="w-full p-5 border border-slate-300 rounded-lg mt-5 mb-8">
			<div className=" my-5">
				<InputImage
					name="ktp"
					label="Upload Foto KTP"
					onRemove={onRemove}
					data={ktp}
					onChange={onChange}
					required={true}
					maxSizeLabel="500Kb"
					acceptableText="JPG, PNG"
					accept="image/jpeg, image/png"
					error={errorKtp}
				/>
			</div>
			<div className="w-full flex justify-start md:justify-end flex-col-reverse md:flex-row gap-y-5 md:gap-y-0">
				<button onClick={onBack} className=" btn normal-case btn-outline btn-success text-white font-semibold md:mr-4">Kembali</button>
				<button onClick={onSubmit}  className=" btn normal-case btn-success text-white font-semibold">Submit</button>
			</div>
		</div>
	)
};

export default FormUnggahIdentitas;