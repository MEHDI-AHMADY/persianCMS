import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import axios from "axios";
import "./Users.css";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditModal from "../../Components/EditModal/EditModal";
import { toast } from "react-toastify";

export default function Users() {
  
  const [users, setUsers] = useState({
    allUsers: [],
    isShowDeleteModal: false,
    isShowEditModal: false,
    mainUserID: "",
  });

  const {register , handleSubmit , setValue , formState : {errors}} = useForm()

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await axios.get(`http://localhost:3000/api/users`);
    const users = res.data;

    setUsers((prevState) => ({
      ...prevState,
      allUsers: users.reverse(),
    }));
  };

  const deleteUser = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/users/${users.mainUserID}`
    );
    setUsers((prevState) => ({
      ...prevState,
      isShowDeleteModal: false,
    }));

    if (res.status === 200) {
      toast("یوزر با موفقیت حذف شد");
    } else {
      toast("خطایی رخ داد.دوباره امتحان کنید");
    }
    getAllUsers();
  };

  const editUser = async (data) => {

    const res = await axios.put(
      `http://localhost:3000/api/users/${users.mainUserID}`,
      data
    );
    setUsers((prevState) => ({
      ...prevState,
      isShowEditModal: false,
    }));

    if (res.status === 200) {
      toast("یوزر با موفقیت ادیت شد");
    } else {
      toast("خطایی رخ داد.دوباره امتحان کنید");
    }

    getAllUsers();
  };

  const editModalOpenHandler = (user) => {
    setUsers((prevState) => ({
      ...prevState,
      isShowEditModal: true,
      mainUserID: user.id,
    }));
    setValue("firsname", user.firsname);
    setValue("lastname", user.lastname);
    setValue("username", user.username);
    setValue("password", user.password);
    setValue("phone", user.phone);
    setValue("city", user.city);
    setValue("email", user.email);
    setValue("address", user.address);
    setValue("score", user.score);
    setValue('buy' , user.buy)
  }

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کاربران</h1>
      {users.allUsers.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {users.allUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firsname} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setUsers((prevState) => ({
                        ...prevState,
                        isShowDeleteModal: true,
                        mainUserID: user.id,
                      }));
                    }}
                  >
                    حذف
                  </button>
                  <button>جزییات</button>
                  <button
                    onClick={() => editModalOpenHandler(user)}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}

      {users.isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف یوزر اطمینان دارید؟"
          deleteModalCancelAction={() =>
            setUsers((prevState) => ({
              ...prevState,
              isShowDeleteModal: false,
            }))
          }
          deleteModalSubmitAction={deleteUser}
        />
      )}

      {users.isShowEditModal && (
        <EditModal
          onClose={() =>
            setUsers((prevState) => ({
              ...prevState,
              isShowEditModal: false,
            }))
          }
          onSubmit={handleSubmit(editUser)}
        >
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('firsname' , { required : true })}
            />
          </div>
          {errors.firsname && <span className="error">وارد کردن نام الزامیست</span>}
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('lastname' , { required : true })}
            />
          </div>
          {errors.lastname && <span className="error">وارد کردن نام خانوادگی الزامیست</span>}
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('username' , { required : true })}
            />
          </div>
          {errors.username && <span className="error">وارد کردن یوزرنیم الزامیست</span>}
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('password' , { required : true })}
            />
          </div>
          {errors.password && <span className="error">وارد کردن پسورد الزامیست</span>}
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('phone' , { required : "وارد کردن شماره تلفن الزامیست" , validate : {
                isNumber : value => !isNaN(Number(value)) || "شماره وارد شده معتبر نیست"
              } } )}
            />
          </div>
          {errors.phone && <span className="error">{errors.phone.message}</span>}
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('city' , { required : false } , {valueAsNumber : true})}
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                },
              })}
            />
          </div>
          {errors.email && <span className="error">ایمیل وارد شده معتبر نیست</span>}
          <div className="edit-user-info-input-group">
            <textarea
              className="edit-user-info-input"
              {...register('address' , { required : false })}
            ></textarea>
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('score' , { required : false })}
            />
          </div>
          <div className="edit-user-info-input-group">
            <input
              type="text"
              className="edit-user-info-input"
              placeholder="مقدار جدید را وارد نمایید"
              {...register('buy' , { required : false })}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
