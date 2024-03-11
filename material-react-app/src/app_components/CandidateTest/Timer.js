// import React, { useState, useEffect } from 'react';
// import MDTypography from 'components/MDTypography';
// import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';

// const Timer = ({ handleNextClick }) => {
//     const initialTime = 90; // 90 seconds = 1 minute 30 seconds
//     const [time, setTime] = useState(initialTime);

//     useEffect(() => {
//         const startTime = parseInt(localStorage.getItem('startTime'), 10) || Date.now();
//         const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//         const remainingTime = initialTime - elapsedTime;

//         if (remainingTime <= 0) {
//             setTime(0);
//             localStorage.removeItem('timer');
//             localStorage.removeItem('startTime');
//             alert('Time is up! The test will be auto-submitted.');
//             handleNextClick();
//         } else {
//             setTime(remainingTime);
//             localStorage.setItem('timer', remainingTime);
//             localStorage.setItem('startTime', startTime);
//         }

//         const interval = setInterval(() => {
//             setTime(prevTime => {
//                 if (prevTime > 0) {
//                     const newTime = prevTime - 1;
//                     localStorage.setItem('timer', newTime);
//                     if (newTime === 60) {
//                         alert('60 seconds  remaining!');
//                     }
//                     return newTime;
//                 } else {
//                     clearInterval(interval);
//                     return 0;
//                 }
//             });
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [handleNextClick]);

//     const formatTime = () => {
//         const minutes = Math.floor(time / 60);
//         const seconds = time % 60;
//         return `${minutes.toString().padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;
//     };

//     return (
//         <MDTypography>
//             <AccessAlarmsIcon color="primary" />
//             &nbsp;Time Left - {formatTime()}
//         </MDTypography>
//     );
// };

// export default Timer;



import React, { useState, useEffect } from 'react';
import MDTypography from 'components/MDTypography';
// import { Icon } from '@mui/material';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
const Timer = () => {
    const initialTime = 90; // 300 seconds = 5 minutes
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        const startTime = parseInt(localStorage.getItem('startTime'), 10) || Date.now();
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const remainingTime = initialTime - elapsedTime;

        if (remainingTime <= 0) {
            alert('Time is up! So test will be auto submit.');
            setTime(0);
            localStorage.removeItem('timer');
            localStorage.removeItem('startTime');
            document.getElementById("submit_test_auto").click();
            // handleNextClick()
        } else {
            setTime(remainingTime);
            localStorage.setItem('timer', remainingTime);
            localStorage.setItem('startTime', startTime);
        }

        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime > 0) {
                    const newTime = prevTime - 1;
                    localStorage.setItem('timer', newTime);
                    if (newTime === 60) {
                        alert('60 seconds remaining!');
                    }else if(newTime === 0){
                         localStorage.removeItem('timer');
                         localStorage.removeItem('startTime');
                         alert('Time is up! So test will be auto submit.');
                         document.getElementById("submit_test_auto").click();

                        //  handleNextClick()
                    }
                    
                    return newTime;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = () => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}H:${minutes
            .toString()
            .padStart(2, '0')}M:${seconds.toString().padStart(2, '0')}S`;
    };

    return (
        <MDTypography variant="h6">
             <AccessAlarmsIcon
                color="primary"
             />
            
             &nbsp;Time Left - {formatTime()}

        </MDTypography>
    );
};

export default Timer;

