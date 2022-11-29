import { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { WizardSection, FormPendaftaran, FormUnggahIdentitas } from "../src/components/claimPage";

import { PendaftaranAttributes, FileAttributes } from "../src/interface/RegisterInterface";
import { UniversitasAttributes, GenderAttributes, ProgrammingLanguageAttributes } from "../src/interface/MasterDataInterface";

import InputValidation from "../src/helpers/InputValidation";
import FileConvert from "../src/helpers/FileConvert";

import DummyData from "../src/dummy/DummyData";

const Home: NextPage = () => {
  const [tab, setTab] = useState<number>(1);
  const [universitas, setUniversitas] = useState<Array<UniversitasAttributes> | []>(DummyData.DummyUniversitas);
  const [gender, setGender] = useState<Array<GenderAttributes> | []>(DummyData.DummyGender);
  const [programming, setProgramming] = useState<Array<ProgrammingLanguageAttributes> | []>(DummyData.DummyProgramming);

  const [dataDiri, setDataDiri] = useState<PendaftaranAttributes>({
    nama: '',
    email: '',
    alamat: '',
    NIK: '',
    genderId: null,
    universitasId: null,
    programmingId: null
  });
  const [ktp, setKtp] = useState<FileAttributes>({
    filleName: "",
    fileContent: "",
  })

  const [errDataDiri, setErrDataDiri] = useState<PendaftaranAttributes>({
    nama: '',
    email: '',
    alamat: '',
    NIK: '',
    genderId: '',
    universitasId: '',
    programmingId: ''
  });

  const [errKtp, setErrKtp] = useState<string>('');

  const [dataSubmit, setDataSubmit] = useState<any>();

  const changeTab = (e: number) => {
    if (e < 3) {
      setTab(e)
    }
  };


  /* --------------------------- Handle Change Data --------------------------- */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let dataValue = '';
    let resError = '';
    if (name === 'nama') {
      dataValue = value
      resError = InputValidation.TextValidation(value, 50, 'Nama', true);
    }
    if (name === 'email') {
      dataValue = value;
      resError = InputValidation.EmailValidation(value, 100, 'Email', true);
    }

    if (name === 'NIK') {
      if (e.target.validity.valid) {
        dataValue = value;
      }
      resError = InputValidation.NIKValidation(dataValue, 16, "NIK", true);
    }

    setDataDiri({
      ...dataDiri,
      [name]: dataValue
    });

    setErrDataDiri({
      ...errDataDiri,
      [name]: resError
    });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setErrDataDiri({
      ...errDataDiri,
      alamat: InputValidation.TextValidation(value, 300, 'Alamat', true)
    });

    setDataDiri({
      ...dataDiri,
      alamat: value
    });
  };

  const changeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value, name } = e.target;

    // const x = gender.filter((i) => {
    //   return i.id === parseInt(value)
    // })

    // console.log(x[0])
		let errResponse = "";
		if (name === "genderId") {
			if (!value || value === "" || value === "default") {
				errResponse = "Gender tidak boleh kosong";
      }
      const selected = gender.filter((i) => {
        return i.id.toString() === value
      })
      setDataDiri({
        ...dataDiri,
        gender: selected[0].name
      })
		}
		if (name === "universitasId") {
			if (!value || value === "" || value === "default") {
				errResponse = "Universitas tidak Boleh kosong";
      }
      const selected = universitas.filter((i) => {
        return i.id.toString() === value
      })
      setDataDiri({
        ...dataDiri,
        universitas: selected[0].name
      })
    }
    if (name === "programmingId") {
      if (!value || value === "" || value === "default") {
				errResponse = "Pemprograman favorit tidak Boleh kosong";
      }
      const selected = programming.filter((i) => {
        return i.id.toString() === value
      })
      setDataDiri({
        ...dataDiri,
        programming: selected[0].name
      })
    }

    setErrDataDiri({
      ...errDataDiri,
      [name]: errResponse
    });

    setDataDiri({
      ...dataDiri,
      [name]: value
    });
	}
  /* ------------------------- End Handle Change Data ------------------------- */

  /* --------------------------- Hanlde Change File --------------------------- */
  const changeKTP = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files ? e.target.files[0] : undefined;
    
    if (files) {
      const resErr = InputValidation.FileValidation(files, ["image/jpeg", "image/png"], "KTP", 500000, true);
      if (resErr === "") {
        const base64 = await FileConvert.ConvertToBase64(files);
        const fileContent = base64 && base64.toString().split(",")[1];
  
        const newData: FileAttributes = {
          filleName: files.name,
          fileType: files.type,
          fileContent: fileContent,
          dataFile: files
        };
  
        setKtp(newData);
      }
      setErrKtp(resErr);
    }
    e.target.value = ''
  };

  const removeKTP = () => {
    // console.log("Remove");
    setKtp({});
  }
  /* ------------------------- End Handle Change File ------------------------- */

  /* ---------------------------- Hanlde Validation --------------------------- */
  const onValidation = ():boolean => {
    const tempVlidationForm: PendaftaranAttributes = {
      nama: InputValidation.TextValidation(dataDiri.nama, 50, 'Nama', true),
      alamat: InputValidation.TextValidation(dataDiri.alamat, 300, 'Alamat', true),
      email: InputValidation.EmailValidation(dataDiri.email, 50, 'Email', true),
      NIK: InputValidation.NIKValidation(dataDiri.NIK, 16, 'NIK', true),
      genderId: !dataDiri.genderId || dataDiri.genderId === "" || dataDiri.genderId === "default" ? "Gender tidak boleh kosong" : "",
      universitasId: !dataDiri.universitasId || dataDiri.universitasId === "" || dataDiri.universitasId === "default" ? "Universitas tidak boleh kosong" : "",
      programmingId: !dataDiri.programmingId || dataDiri.programmingId === "" || dataDiri.programmingId === "default" ? "Pemprograman Favorit tidak boleh kosong" : ""
    };

    const errFile: string = InputValidation.FileValidation(ktp.dataFile, ["image/jpeg", "image/png"], "KTP", 500000, true);

    // console.log(errFile)

    setErrKtp(errFile);

    setErrDataDiri(tempVlidationForm);

    for (var key in tempVlidationForm) {
      if ((tempVlidationForm as any)[key] !== "") {
        setTab(1);
        return false;
      }
    }

    

    if (errFile !== "") {
      setTab(2);
      return false;
    }

    return true;
  };
  /* -------------------------- End Handle Validation ------------------------- */

  /* ------------------------------ Handle Submit ----------------------------- */
  const onSubmit = () => {
    const valid = onValidation();
    if (valid) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Submit"
      })
        .then((res) => {
          if (res.isConfirmed) {
            setDataSubmit(formatData(dataDiri, ktp))
            setTab(3)
        }
      })
    }
  };

  const formatData = (data:PendaftaranAttributes, dataKtp: FileAttributes):any => {
    const output = {
      nama: data.nama,
      email: data.email,
      alamat: data.alamat,
      NIK: data.NIK,
      universitasId: data.universitasId,
      universitas: data.universitas,
      genderId: data.genderId,
      gender: data.gender,
      programmingId: data.programmingId,
      programming: data.programming,
      dataKtp: {
        fileName: dataKtp.filleName,
        fileType: dataKtp.fileType,
        base64File: dataKtp.fileContent
      }
    };

    return output;
  }
  /* ---------------------------- End Handle Submit --------------------------- */

  return (
    <div className=" container overflow-x-hidden">
      <Head>
        <title>Registrasi Bootcamp</title>
        <link rel="icon" href="/logo.png" />
      </Head>
        <Script src="https://kit.fontawesome.com/42c3668ae2.js" crossOrigin="anonymous" defer></Script>
      <WizardSection tabActive={tab} changeTab={changeTab} />
      <div className="w-full mt-5 bg-primary-90 bg-opacity-60 py-1">
        <p className=" text-center text-primary-20 font-bold text-base md:text-2xl">Registrasi Bootcamp Front End Developer</p>
      </div>
      <div className={`${tab === 1 ? 'block' : 'hidden'}`}>
        <FormPendaftaran
          onNext={() => setTab(2)}
          onChange={onChange}
          onChangeTextArea={onChangeTextArea}
          data={dataDiri}
          errorData={errDataDiri}
          listUniversitas={universitas}
          listGender={gender}
          listProgramming={programming}
          onChangeDropdown={changeDropdown}
        />
      </div>
      <div className={`${tab === 2 ? 'block' : 'hidden'}`}>
        <FormUnggahIdentitas
          ktp={ktp}
          onBack={() => setTab(1)}
          onSubmit={onSubmit}
          onChange={changeKTP}
          onRemove={removeKTP}
          errorKtp={errKtp}
        />
      </div>
      <div className={`${tab === 3 ? 'block' : 'hidden'}`}>
        <pre className=" break-all overflow-auto block">{JSON.stringify(dataSubmit, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home;