import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { InputText, Dropdown, InputTextArea } from "../";
import { PendaftaranAttributes } from "../../interface/RegisterInterface";
import { UniversitasAttributes, GenderAttributes, ProgrammingLanguageAttributes } from "../../interface/MasterDataInterface";

interface FormPendaftaranProps {
	onNext: () => void,
	onChange: (e: ChangeEvent<HTMLInputElement>) => void,
	onChangeTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void,
	onChangeDropdown: (e: ChangeEvent<HTMLSelectElement>) => void
	data: PendaftaranAttributes,
	errorData: PendaftaranAttributes,
	listUniversitas: Array<UniversitasAttributes> | [],
	listGender: Array<GenderAttributes> | [],
	listProgramming: Array<ProgrammingLanguageAttributes> | []
}


const FormPendaftaran: FC<FormPendaftaranProps> = ({ onNext, onChange, onChangeTextArea, data, errorData, listUniversitas, listGender, listProgramming, onChangeDropdown }) => {
	return (
		<div className=" p-5 border border-slate-300 rounded-lg mt-5 mb-8">
			<p className=" text-xl font-semibold mb-5 text-primary-20">Data Diri</p>
			<div className=" mb-5">
				<InputText
					name="nama"
					required={true}
					type="text"
					label="Nama"
					onChange={onChange}
					value={data?.nama ?? ''}
					error={ errorData?.nama }
				/>
			</div>
			<div className="mb-5">
				<InputText
					name="email"
					required={true}
					type="email"
					label="Email"
					onChange={onChange}
					value={data?.email ?? ''}
					error={errorData?.email}
				/>
			</div>
			<div className="mb-5">
				<InputText
					name="NIK"
					required={true}
					type="text"
					label="NIK"
					value={data?.NIK ?? ''}
					pattern="[0-9]*"
					onChange={onChange}
					error={errorData?.NIK}
				/>
			</div>
			<div className="mb-5">
				<InputTextArea
					name="Alamat"
					label="Alamat"
					required={true}
					onChange={onChangeTextArea}
					value={data?.alamat ?? ''}
					error={errorData?.alamat}
				/>
			</div>
			<div className="mb-5">
				<Dropdown
					options={listGender}
					keyLabel="name"
					keyValue="id"
					label="Gender"
					name="genderId"
					required={true}
					labelPlaceholder="- Pilih Gender -"
					value={data?.genderId ?? 'default'}
					onChange={onChangeDropdown}
					error={errorData?.genderId?.toString()}
				/>
			</div>
			<div className="mb-5">
				<Dropdown
					options={listUniversitas}
					keyLabel="name"
					keyValue="id"
					label="Universitas"
					name="universitasId"
					required={true}
					labelPlaceholder="- Pilih Universitas -"
					value={data?.universitasId ?? 'default'}
					onChange={onChangeDropdown}
					error={errorData?.universitasId?.toString()}
				/>
			</div>
			<div className="mb-5">
				<Dropdown
					options={listProgramming}
					keyLabel="name"
					keyValue="id"
					label="Bahasa Pemprograman Favorit"
					name="programmingId"
					required={true}
					labelPlaceholder="- Pilih Bahasa Pemprograman -"
					value={data?.programmingId ?? 'default'}
					onChange={onChangeDropdown}
					error={errorData?.universitasId?.toString()}
				/>
			</div>

			<div className="w-full flex justify-end items-end">
				<button onClick={onNext} className=" w-full lg:w-auto btn normal-case btn-success text-white font-semibold">Selanjutnya</button>
			</div>
		</div>
	);
};

export default FormPendaftaran;