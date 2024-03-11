import Swal from "sweetalert2";

export function handleRequestError(error) {
    if (error.response) {
        // Xử lý lỗi từ phía server
        Swal.fire({
            title: "Lỗi!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
        });
    } else if (error.request) {
        // Xử lý lỗi khi không nhận được phản hồi từ server (mất kết nối)
        Swal.fire({
            title: "Lỗi!",
            text: "Mất kết nối",
            icon: "error",
            confirmButtonText: "OK",
        });
    } else {
        // Xử lý lỗi khác
        console.error("Lỗi", error.message);
    }
}