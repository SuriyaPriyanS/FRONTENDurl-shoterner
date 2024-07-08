import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Account = () => {
    const {id} = useParams();
    const [serachparams] = useSearchParams();
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const activateUser = async (id,token,payload)=>{
        console.log("Verifying activation");
        try {
            const response = await activateAccount(id,token,payload)
            console.log(response);
            if(response.status === 200){
                console.log(response.data);
                setMessage("success -account activated")

                window.alert("Account activated successfully.Login")
                navigate(`login`);
            }
            else {
                console.log("error activating");
                let errmeg = "error activating"
                setMessage(errmeg)
                window.alert("error activating account")
            }

        } catch (error) {
            console.log("error authorizing");
            console.log(error.response)
            let errmeg = "Activation link invaild"
            setMessage(errmeg)
            window.alert("Activation link invaild")
            
        }


    }

    useEffect(()=> {
        const token = serachparams.get("activateToken")
        console.log("calling fn");
        if(id && token) {
            activateUser(id,token, {isActivated: true});
        }

    }, [id, serachparams])
    return (
        <div>
            <h5 className='my-5'>Activate Account</h5>
            <div className='text-blue mx-auto my-5'>
                <h6>Verfying user authorization. please wait ..</h6>
                {msg && <h6 className='my-3 text-danger'>{msg}</h6>}
            </div>
        </div>
    );
};

export default Account;