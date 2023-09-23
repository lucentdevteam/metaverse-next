import getData from "./getData";

export const getIsUserExist = async (email) => {
    const data = []
    const allData = await getData('users').then((res) => res.forEach((item) => data.push(item)));
    const isExist = data.find((item) => item?.email?.stringValue === email);
  return isExist;
};
