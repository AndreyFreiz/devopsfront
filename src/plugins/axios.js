import redaxios from "https://cdn.jsdelivr.net/npm/redaxios@0.5.1/+esm";

export const baseAxios = redaxios.create({
    baseURL: 'https://api.example.com'
});
