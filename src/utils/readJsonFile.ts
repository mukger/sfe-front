export const readFile = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
                resolve(reader.result);
        };
        reader.onerror = (error) => {
                reject(error);
        };
        reader.readAsText(file);
    });
};