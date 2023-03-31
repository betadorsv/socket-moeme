import axios from "axios";

import axiosClient from "./axiosClient";

const URL = "http://moa.aveapp.com:21405";

interface Props {
  url: string;
  param: any;
  onDone?: (result: any) => any;
}

const fileServerApi = {
  uploadFile(file: any): Promise<Response> {
    const url = `${URL}/file/api/fileupload_proc.jsp`;
    let formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(url, formData);
  },


};

export default fileServerApi;
