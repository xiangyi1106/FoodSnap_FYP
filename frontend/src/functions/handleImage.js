import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const handleImage = (file, setError, setImage) => {
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
    //   setError(`${file.name} format is not supported.`);
      toast.error(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 10) {
    //   setError(`${file.name} is too large. Maximum size allowed is 10MB.`);
      toast.error(`${file.name} is too large. Maximum size allowed is 10MB.`);
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  