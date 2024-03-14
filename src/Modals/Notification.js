import { toast } from 'react-toastify';

export const successNotification = (message) => {
    toast.success(message,{
        position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
    });    
};

export const warningNotification = (message) => {
     toast.warning(message,{
        position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
      });
};

export const errorNotification = (message) => {
    toast.error(message,{
       position: "bottom-center",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
     });
};

export const infoNotification = (message) => {
    toast.info(message,{
       position: "bottom-center",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "colored",
     });
};