import Image from "next/image";


type User ={
  name: string,
  age: number,
  email: string
}
export default function Home() {
  const user: User = {
    name: "Hoang",
    age: 21,
    email: "hoangnguyengiap04@gmail.com"
  }
  return(
    <>
      <h1 className="text-3xl font-black-500 font-bold">Xin chào ông {user.name} quay trở lại</h1>
    </>
  );
}
