
export function generateSlug(str) {
    str = str.replace(/à|á|ạ|ả|ã|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ế|ề|ể|ễ|ệ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    str = str.replace(/ /g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/[^a-zA-Z0-9\-]/g, ""); // Cho phép giữ lại dấu "-"

    str = str.replace(/-+/g, "-"); // Thêm dấu cách sau mỗi dấu "-"

    str = str.replace(/^-+|-+$/g, "");

    str = str.toLowerCase(); // Chuyển đổi sang dạng in thường

    return str;
};
