import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000" + "/api", // matches your Express server
  withCredentials: true, // send cookies for sessions
});

// ---------------------------
// Auth API functions
// ---------------------------
export async function login(username, password) {
  try {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
  } catch (err){
    // console.log(err.response?.data);
    return err.response?.data;
  }
}

export async function logout() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  try {
    const res = await api.get("/auth/me"); 
    return res; // { user: ... } or { user: null }
  } catch (err) {
    return err.response?.data;
  }
}

export async function register(username, password, role) {  
  try {
    const res = await api.post("/auth/register", { username, password, role});
    return res.data;
  } catch (err) {
    return err.response?.data;
  }
}

export async function getUsers() {
  try {
    const res = await api.get("/users", {});
    return res.data;
  } catch (err) {
    return err.response?.data;
  }
}
export async function getProducts() {
  try {
    const res = await api.get("/products", {});
    return res.data;
  } catch (err) {
    return err.response?.data;
  }
}
export async function updateProduct(key, body) {
  try {
    // console.log("This is the key you are looking for: ", key);
    const res = await api.put(`/products/${key}`, body);
    return res.data;
  } catch (err) {
    return err.response?.data;
  }
}
export async function upTelegramBot(isBotOn, botKey) {
  try {
    const res = await api.post("/bots", {isBotOn, botKey});
    
    return res.data;
  } catch (err) {
    // console.log(err);
    return err.response?.data;
  }
}