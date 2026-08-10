import JSZip from "jszip";


export async function parseInstagramZip(file:File){

    const zip = await JSZip.loadAsync(file);


    const files = Object.keys(zip.files);


    console.log("Files found:", files);


    return files;

}