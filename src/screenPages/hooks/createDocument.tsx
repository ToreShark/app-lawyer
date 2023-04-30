import instance from "../../api/createApi";
import {ICreateDocumentDto} from "../interface/CreateDocument";

const createDocument = async (createDocumentDto : ICreateDocumentDto) => {
    try {
        const response = await instance.post('documents', createDocumentDto);
        return response.data;
    } catch (error) {
        console.error('Error creating document:', error);
        throw error;
    }
};

export default createDocument;