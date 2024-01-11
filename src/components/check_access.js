import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PasswordCheck from './PasswordCheck';

const CheckAccess = ({url}) => {
    const [status, setStatus] = useState(null); // 초기값을 200으로 설정

    useEffect(() => {
        const fetchData = async () => {
            try {
                // // 임시로 서버 요청 부분을 주석 처리하고,
                // const response = await fetch(url);
                // if (response.status === 404) {
                //     console.error('404 error occurred');
                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Oops...',
                //         text: '요청하신 페이지를 찾을 수 없습니다.',
                //     });
                // } else if (response.status === 410) {
                //     console.error('410 error occurred');
                //     Swal.fire({
                //         icon: 'warning',
                //         title: 'Oops...',
                //         text: '요청하신 페이지는 더 이상 사용할 수 없습니다.',
                //     });
                // } else if (response.status === 200) {
                //     console.log('Access granted');
                //     setStatus(200);
                // }

                // // 즉시 status를 200으로 설정
                setStatus(200);
            } catch (error) {
                console.error("Failed to fetch: ", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '서버로부터 응답을 받는데 실패했습니다.',
                });
            }
        };

        fetchData();
    }, [url]);

    if (status === 200) {
        return <PasswordCheck/>
    }
    else if(status===404){
        return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '요청하신 페이지를 찾을 수 없습니다.',
                });
    }
    else if(status===410){
        return  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: '요청하신 페이지가 만료되었습니다.',
                });
    }
    // 기타 처리나 로딩 상태를 표시할 수 있습니다.
    return null;
};

export default CheckAccess;