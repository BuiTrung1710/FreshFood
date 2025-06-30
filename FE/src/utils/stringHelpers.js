export const formatDatetime = (datetime) => {
  const date = new Date(datetime);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return formattedDate;
};

// export const formatDatetime2 = (datetime) => {
//   const date = new Date(datetime);
//   let day = date.getDate();
//   const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
//     day < 10 ? `0${day}` : day
//   }`;
//   return formattedDate;
// };
export const formatDateForInput = (dateTime) => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // Thêm số 0 phía trước nếu tháng hoặc ngày nhỏ hơn 10
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};
