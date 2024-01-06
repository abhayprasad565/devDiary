import { useContext, createContext } from "react";

// create a context to store user info
const UserInfo = createContext({
    isLoggedIn: false,
    userInfo: {},
});
// wrap it with provider
export const UserInfoProvider = UserInfo.Provider;
// export usecase
export default function getUserInfo() {
    return useContext(UserInfo);
}
