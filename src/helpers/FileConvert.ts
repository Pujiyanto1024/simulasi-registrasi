const ConvertToBase64 = (files: File):Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(files)
		fileReader.onload = () => {
			resolve(fileReader.result);
		}
		fileReader.onerror = (error) => {
			reject(error);
		}
	})
};

export default { ConvertToBase64 }