import React from "react";
import { Table, Input } from "antd";
import { removeVietnameseTones } from "../../utils/util";
const { Search } = Input;

const TableSinhVien = ({
  arrSinhVien,
  setArrSinhVien,
  handleDeleteSinhVien,
  handleGetSinhVien,
}) => {
  const onSearch = (value) => {
    const newKeyWord = removeVietnameseTones(value.toLowerCase().trim());
    const newArrSinhVien = [...arrSinhVien];
    let arrSinhVienFilter = newArrSinhVien.filter((item) => {
      let newTenSinhVien = removeVietnameseTones(
        item.name.toLowerCase().trim()
      );
      return newTenSinhVien.includes(newKeyWord);
    });
    setArrSinhVien(arrSinhVienFilter);
  };
  // const data = [];
  const columns = [
    {
      title: "MSSV",
      dataIndex: "mssv",
      key: "msnv",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        return (
          <>
            <button
              onClick={() => {
                handleDeleteSinhVien(record.mssv);
              }}
              className="py-2 px-5 bg-red-500 text-white rounded-md hover:bg-green-500 duration-500"
            >
              Xóa
            </button>
            <button
              onClick={() => {
                handleGetSinhVien(record);
              }}
              className="py-2 px-5 bg-yellow-500 text-white rounded-md ml-3 hover:bg-green-500 duration-500"
            >
              Sửa
            </button>
          </>
        );
      },
    },
    {
      title: (
        <Search
          placeholder="Nhập tên sinh viên"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      ),
    },
  ];
  return <Table columns={columns} dataSource={arrSinhVien} />;
};

export default TableSinhVien;
