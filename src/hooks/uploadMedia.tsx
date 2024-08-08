import axios from "axios";

export default function uploadMedia(
    file: File,
    type: "profile_picture" | "profile_banner" | "post_media"
): Promise<any> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target!.result as string;
            const data = {
                image: base64Image,
                ext: file.type.split("/")[1],
                type: type,
            };

            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API!}/images`,
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                resolve(response.data);
            } catch (error) {
                console.error("Error al enviar la imagen:", error);
                reject(error);
            }
        };

        reader.readAsDataURL(file);
    });
}
