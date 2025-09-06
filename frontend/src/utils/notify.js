import { toast } from "react-toastify";

const notify = (comment, type) => {
  const toasts = {
    error: toast.error,
    success: toast.success,
    warning: toast.warning,
  }
  toasts[type](comment, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    className: 'p-3 w-[400px] border border-purple-600/40',
  });
};

export default notify;
