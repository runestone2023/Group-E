import { Callback } from "../../types/helpers/callback";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from ".";

export const handleUploadImageOnFirebase = async (file: File, cb?: Callback): Promise<string> => {
  const imageRef = ref(storage, `staffImages/${file.name} + ${uuidv4()}`);
  try {
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    cb?.onSuccess?.(url);
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
    return url;
  } catch (error) {
    throw error;
  }
};
