import {useState} from "react";
import {FormContainer, InputField, SubmitButton} from "./login-page-styled";
import { useNavigate} from "react-router-dom";

const baseUrl = 'https://icebrg.mehanik.me/api'
export const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((res)=> res.json()).then((res)=> {
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token)
            console.log('res', res.access_token,res.refresh_token )
            navigate('/search')
        })
    };

    return        (
        <FormContainer>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <InputField
                type="text"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
            />
            <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <SubmitButton type="submit">Login</SubmitButton>
        </form>

            <p>applicant@icebrg.uk и пароль assignment_task375</p>
    </FormContainer>)
}
