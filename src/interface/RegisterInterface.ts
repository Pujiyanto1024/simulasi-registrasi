export interface PendaftaranAttributes {
	nama?: string | null,
	email?: string | null,
	NIK?: string | null,
	alamat?: string | null,
	genderId?: number | string | null,
	gender?: string,
	universitasId?: number | string | null,
	universitas?: string,
	programmingId?: number | string | null,
	programming?: string
}

export interface FileAttributes {
	filleName?: string,
	fileType?: string,
	fileContent?: string | null
	dataFile?: File
} 