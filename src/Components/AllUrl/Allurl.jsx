import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './GlobalContext'; // Adjust the import based on where your context is defined
import { Allurl as fetchAllUrl, updateUrlcount as updateUrlcountDb } from './api'; // Adjust the import based on where your API functions are defined

const Allurl = () => {
    const [urllist, setURLList] = useState([]);
    const [isLogged, currentUser] = useGlobalContext(); // Assuming `useGlobalContext` provides these values

    const getAll = async (data, config) => {
        console.log('All url in data');
        try {
            const response = await fetchAllUrl(data, config);
            if (response.status === 200) {
                setURLList(response.data.data);
            }
        } catch (error) {
            window.alert("Network error");
            console.error("error", error);
        }
    };

    const updateUrlcountDb = async (data, config) => {
        try {
            const response = await updateUrlcountDb(data, config);
            if (response.status === 200) {
                let id = response.data.data.value.urlID;
                let clickcount = response.data.data.value.clicked;

                setURLList(urllist.map((ele) => {
                    if (ele.urlID === id) {
                        return { ...ele, clicked: clickcount };
                    } else {
                        return ele;
                    }
                }));
            }
        } catch (error) {
            window.alert("Network error");
            console.error("error", error);
        }
    };

    const handlecount = async (e) => {
        console.log("url clicked");
        let tokenAuth = localStorage.getItem("tokenAuth");
        const config = {
            headers: { "x-auth-token": tokenAuth }
        };
        const data = { id: e.target.id };
        updateUrlcountDb(data, config);
    };

    useEffect(() => {
        let tokenAuth = localStorage.getItem("tokenAuth");
        const config = { headers: { "x-auth-token": tokenAuth } };
        let LoggedUser = localStorage.getItem("loggedUser");

        let data = { email: LoggedUser };
        if (LoggedUser && tokenAuth) {
            getAll(data, config);
        } else {
            console.log("log in to continue");
            window.alert("log in to continue");
        }
    }, [isLogged, currentUser]);

    return (
        <>
            <h4 className='text-decoration text-decoration-underline mb-3'>All URL</h4>
            <div className='d-flex flex-column justify-content-center align-content-center flex-wrap'>
                <h5>Total URLs created by user: {urllist.length}</h5>
                <div className='w-75 overflow-auto'>
                    {urllist.length > 0 &&
                        <table className='table table-primary table-striped table-responsive-md mt-3'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Short URL</th>
                                    <th scope='col'>Clicked</th>
                                    <th scope='col'>Long URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {urllist.map((ele, index) => (
                                    <tr key={ele.urlID}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{ele.createon}</td>
                                        <td>
                                            <a
                                                id={ele.urlID}
                                                className='text-decoration-none'
                                                href={`/${ele.urlID}`}
                                                onClick={handlecount}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {ele.shortURL}
                                            </a>
                                        </td>
                                        <td>{ele.clicked}</td>
                                        <td title={ele.longURL}>{ele.longURL.substring(0, 20) + "..."}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
};

export default Allurl;
