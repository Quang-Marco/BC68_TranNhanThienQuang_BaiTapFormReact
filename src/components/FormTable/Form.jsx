import React, { useEffect, useState } from "react";
import InputCustom from "./InputCustom";
import TableSinhVien from "./TableSinhVien";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getValueLocalStorage, setValueLocalStorage } from "../../utils/util";

const Form = () => {
  const [arrSinhVien, setArrSinhVien] = useState([]);
  const [sinhVien, setSinhVien] = useState();
  const {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    values,
    setValues,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      mssv: "",
      name: "",
      phone: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      const newArrSinhVien = [...arrSinhVien, values];
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
      resetForm();
    },
    validationSchema: Yup.object({
      mssv: Yup.string()
        .required("Vui lòng không bỏ trống")
        .min(4, "MSSV phải nhiều hơn 4 ký tự")
        .max(8, "MSSV phải ít hơn 8 ký tự"),
      name: Yup.string().required("Vui lòng không bỏ trống"),
      phone: Yup.string()
        .required("Vui lòng không bỏ trống")
        .matches(
          /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
          "Vui lòng nhập đúng định dạng số điện thoại Việt Nam bắt đầu bằng 0 hoặc +84"
        ),
      email: Yup.string()
        .required("Vui lòng không bỏ trống")
        .email("Vui lòng nhập định dạng Email"),
    }),
  });

  // Dùng useEffect để setValueLocalStorage
  // useEffect(() => {
  //   if (arrNhanVien.length > 0)
  //     setValueLocalStorage("arrNhanVien", arrNhanVien);
  // }, []);

  useEffect(() => {
    const data = getValueLocalStorage("arrSinhVien");
    data && setArrSinhVien(data);
  }, []);

  useEffect(() => {
    sinhVien && setValues(sinhVien);
  }, [sinhVien]);

  const handleDeleteSinhVien = (mssv) => {
    const newArrSinhVien = [...arrSinhVien];
    let index = newArrSinhVien.findIndex((item) => item.mssv == mssv);
    if (index != -1) {
      newArrSinhVien.splice(index, 1);
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
    }
  };

  const handleGetSinhVien = (sinhVien) => {
    setSinhVien(sinhVien);
  };

  const handleUpdateSinhVien = (mssv) => {
    const newArrSinhVien = [...arrSinhVien];
    let index = newArrSinhVien.findIndex((item) => item.mssv == mssv);
    if (index != -1) {
      newArrSinhVien[index] = values;
      setArrSinhVien(newArrSinhVien);
      setValueLocalStorage("arrSinhVien", newArrSinhVien);
    }
  };

  return (
    <div className="container mx-auto py-5">
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <InputCustom
            contentLabel="Mã số sinh viên"
            placeholder="Vui lòng nhập mssv"
            name="mssv"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mssv}
            errors={errors.mssv}
            touched={touched.mssv}
          />
          <InputCustom
            contentLabel="Họ và tên"
            placeholder="Vui lòng nhập họ và tên"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errors={errors.name}
            touched={touched.name}
          />
          <InputCustom
            contentLabel="Số điên thoại"
            placeholder="Vui lòng nhập số điện thoại"
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            errors={errors.phone}
            touched={touched.phone}
          />
          <InputCustom
            contentLabel="Email"
            placeholder="Vui lòng nhập email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errors={errors.email}
            touched={touched.email}
          />
          <div className="space-x-5">
            <button
              type="submit"
              className="py-2 px-5 bg-black text-white rounded-lg hover:bg-green-500 duration-500"
            >
              Thêm sinh viên
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-2 px-5 bg-red-500 text-white rounded-lg hover:bg-green-500 duration-500"
            >
              Reset form
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isValid) {
                  return;
                }
                handleUpdateSinhVien(values.mssv);
                handleReset();
              }}
              className="py-2 px-5 bg-yellow-500 text-white rounded-lg hover:bg-green-500 duration-500"
            >
              Cập nhật sinh viên
            </button>
          </div>
        </div>
      </form>
      <TableSinhVien
        arrSinhVien={arrSinhVien}
        handleDeleteSinhVien={handleDeleteSinhVien}
        handleGetSinhVien={handleGetSinhVien}
        setArrSinhVien={setArrSinhVien}
      />
    </div>
  );
};

export default Form;
