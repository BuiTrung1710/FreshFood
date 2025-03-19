import React, { useState } from "react";
//Khi không có ...account thì sẽ như này:
//VD: khi nhập hết giá trị vào account như email, username, password mà không có ...account thì khi nhập lại email các giá trị khác sẽ bị reset 
const MyForm = () => {
  const [account, setAccount] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    // Không sử dụng spread operator, chỉ cập nhật giá trị mới cho thuộc tính email
    setAccount({ email: e?.target?.value });
    
  };
  console.log(account)

  return (
    <form>
      <label>Email:</label>
      <input type="text" value={account.email} onChange={handleChange} />
      <label>UserName:</label>
      <input
        type="text"
        value={account.username}
      />
      <label>Password:</label>
      <input type="text" value={account.password} />
      {/* Các trường khác của form */}
    </form>
  );
};

export default MyForm;
