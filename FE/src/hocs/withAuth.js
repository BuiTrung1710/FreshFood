import { useEffect } from "react";
import { useUser } from "../providers/user-provider"
import { getProfile } from "../services/account";

//withAuth là một HOC nhận một component được gọi là WrappedComponent và trả về một phiên bản mới của WrappedComponent với tính năng xác thực được thêm vào.
//Đoạn mã sẽ chạy lại khi trang được reload. Điều này là do useEffect được gọi mỗi khi component được render, bao gồm cả lần đầu tiên và mỗi lần dependencies thay đổi.
const withAuth = (WrappedComponent) => (props) =>{
    const {setUser} = useUser();
    //console.log("user abc:", user);
    useEffect(()=>{
        getProfile().then((res)=> {
            setUser(res.data.data) 
            console.log("user:", res.data.data);
        }).catch((err)=> setUser());
    },[setUser]);

    return <WrappedComponent {...props}/>;
}
export default withAuth;