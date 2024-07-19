import React, { useEffect, useState } from "react";
import "./Comments.css";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import axios from "axios";
import DetailModal from "../../Components/DetailModal/DetailModal";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import EditModal from "../../Components/EditModal/EditModal";
import { toast } from "react-toastify";

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState("");
  const [mainCommentID, setMainCommentID] = useState("");

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const res = await axios.get("http://localhost:3000/api/comments");
    const comments = res.data;
    setAllComments(comments);
  };

  const closeDetailModal = () => setIsShowDetailsModal(false);

  const deleteComment = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/comments/${mainCommentID}`
    );

    if (res.status === 200) {
      toast("کامنت با موفقیت حذف شد");
    } else {
      toast("دقایقی دیگر دوباره امتحان کنید");
    }

    setIsShowDeleteModal(false);
    getAllComments();
  };

  const editComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/comments/${mainCommentID}`,
        {
          body: mainCommentBody,
        }
      );

      if (res.status === 200) {
        toast("کامنت با موفقیت ادیت شد");
      } else {
        toast("خطایی رخ داد . دوباره امتحان کنید");
      }
      setIsShowEditModal(false);

      getAllComments();
    } catch (err) {
      console.log(err);
    }
  };

  const acceptComment = async () => {
    const res = await axios.post(
      `http://localhost:3000/api/comments/accept/${mainCommentID}`
    );

    if (res.status === 200) {
      toast("کامنت با موفقیت تایید شد");
    } else {
      toast("خطایی رخ داد. دوباره امتحان کنید");
    }

    setIsShowAcceptModal(false);
    getAllComments();
  };

  const rejectComment = async () => {
    const res = await axios.post(
      `http://localhost:3000/api/comments/reject/${mainCommentID}`
    );

    if (res.status === 200) {
      toast("کامنت با موفقیت رد شد");
    } else {
      toast("خطایی رخ داد . دوباره امتحان کنید");
    }

    setIsShowRejectModal(false);
    getAllComments();
  };

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت ها</h1>
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ ثبت</th>
              <th>ساعت ثبت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDetailsModal(true);
                      setMainCommentBody(comment.body);
                    }}
                  >
                    دیدن کامنت
                  </button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setMainCommentID(comment.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => {
                      setIsShowEditModal(true);
                      setMainCommentBody(comment.body);
                      setMainCommentID(comment.id);
                    }}
                  >
                    ویرایش
                  </button>

                  <button>پاسخ</button>

                  {comment.isAccept === 0 ? (
                    <button
                      onClick={() => {
                        setIsShowAcceptModal(true);
                        setMainCommentID(comment.id);
                      }}
                    >
                      تایید
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsShowRejectModal(true);
                        setMainCommentID(comment.id);
                      }}
                    >
                      رد
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

      {isShowDetailsModal && (
        <DetailModal onHide={closeDetailModal}>
          <p className="text-modal">{mainCommentBody}</p>
        </DetailModal>
      )}

      {isShowDeleteModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          deleteModalCancelAction={() => setIsShowDeleteModal(false)}
          deleteModalSubmitAction={deleteComment}
        />
      )}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={editComment}
        >
          <textarea
            value={mainCommentBody}
            onChange={(e) => setMainCommentBody(e.target.value)}
          ></textarea>
        </EditModal>
      )}

      {isShowAcceptModal && (
        <DeleteModal
          title="آیا از تایید اطمینان دارید؟"
          deleteModalCancelAction={() => setIsShowAcceptModal(false)}
          deleteModalSubmitAction={acceptComment}
        />
      )}

      {isShowRejectModal && (
        <DeleteModal
          title="آیا از رد کامنت اطمینان دارید؟"
          deleteModalCancelAction={() => setIsShowRejectModal(false)}
          deleteModalSubmitAction={rejectComment}
        />
      )}
    </div>
  );
}
