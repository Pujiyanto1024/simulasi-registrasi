const TextValidation = (text: string | null = '', maxLength: number = 255, fieldName: string = "Name", required: boolean = true): string => {
	if (text === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if(text === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (text && text.length > maxLength) {
		return `${fieldName} maksimal ${maxLength} karakter`;
	}

	return "";
};

const EmailValidation = (email: string | null = '', maxLength: number = 255, fieldName: string = "Email", required: boolean = true): string => {
	if (email === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (email === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (email && email.length > maxLength) {
		return `${fieldName} maksimal ${maxLength} karakter`;
	}
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return `${fieldName} tidak valid`;
	}

	return "";
};

const PasswordValidation = (password: string | null = '', fieldName: string = "Password", required: boolean = true): string => {
	if (password === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (password === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (password && password.length < 8) {
		return `${fieldName} min length is ${8}`;
	}
	if (password && password.length > 255) {
		return `${fieldName} max length is ${255}`;
	}
	return "";
};

const NumberValueValidation = (value: string | number | null, fieldName: string, maxValue: number = 10, required: boolean = true): string => {
	if (value === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (value === '' && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (parseInt(value?.toString() ?? '0') > maxValue) {
		return `${fieldName} max value is ${maxValue}`;
	}

	return "";
}

const NIKValidation = (value: string | null = '', length: number = 16, fieldName: string = "NIK", required: boolean = true): string => {
	if (value === null && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (value === "" && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (value && value.length !== length) {
		return `${fieldName} harus ${length} angka`;
	}
	if (value && /[^0-9]/.test(value)) {
		return `${fieldName} tidak valid`;
	}

	return "";
};

const FileValidation = (files?: File, mimeType: Array<string> = [], fieldName: string = "", maxSize: number = 1000, required: boolean = true): string => {
	
	if (!files && required) {
		return `${fieldName} tidak boleh kosong`;
	}
	if (files && mimeType.indexOf(files.type) === -1) {
		return `${fieldName} tidak valid`;
	}
	if (files && files.size > maxSize) {
		return `${fieldName} maksimal ${maxSize/1000}Kb`;
	}
	return "";
}

export default { TextValidation, EmailValidation, PasswordValidation, NumberValueValidation, NIKValidation, FileValidation };