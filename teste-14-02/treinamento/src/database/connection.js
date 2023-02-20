import axios from "axios";
export const db = axios.create({
    baseURL: "http://localhost:3001",
    timeout: 6000,
});

export async function connectDb() {
    const res = await db.get("/users");
    if (res.status == 200) {
        console.log("server is running");
    } else {
        console.log("server not connected");
    }
    return res.data;
}

export async function registerDb() {
    const data = { email: "email@email.com", password: "12345" };
    const res = await db.post("/users", data);
    return res;
}
export async function loginDb(data) {
    //const data = { email: "email@email.com", password: "12345" };
    const res = await db.post("/login", data);
    console.log(res);
    return res;
}
export async function getDespesas() {
    const res = await db.get("/novadespesa");
    console.log(res.data);
    return res;
}
export async function postNewDespesa(data) {
    const token = localStorage.getItem("@merceariaToken");
    const idDate = new Date().getTime().toPrecision();
    console.log(idDate);
    data.id = idDate;
    console.log(data);
    const res = await db.post("/novadespesa", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(res.data);
    return res;
}
