import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";

export const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 flex h-screen justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your info to create an account"} />
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value);
                }} placeholder="Jhon" label={"First Name"} />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value);
                }} placeholder="Doe" label={"Last Name"} />
                <InputBox onChange={(e) => {
                    setUserName(e.target.value);
                }} placeholder="jhon@gmail.com" label={"Email"} />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder="123456" label={"Password"} />
                <div>
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", response.data.token)                       
                        navigate("/dashboard?name=" + firstname)
                    }} label={"Sign up"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}