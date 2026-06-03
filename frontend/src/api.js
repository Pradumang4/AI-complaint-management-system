const API = "http://127.0.0.1:8000";

// 🔹 Create complaint
export const createComplaint = async (text, username) => {
    const res = await fetch(`${API}/complaint?text=${text}&username=${username}`, {
        method: "POST"
    });
    return res.json();
};

// 🔹 Get all complaints
export const getComplaints = async (username) => {
    const res = await fetch(`${API}/complaints?username=${username}`);
    return res.json();
};

// 🔹 Update complaint status
export const updateStatus = async (id, status) => {
    const res = await fetch(`${API}/update-status?id=${id}&status=${status}`, {
        method: "PUT"
    });
    return res.json();
};

// 🔹 Register user
export const registerUser = async (username, password) => {
    const res = await fetch(`${API}/register?username=${username}&password=${password}`, {
        method: "POST"
    });
    return res.json();
};

// 🔹 Login user
export const loginUser = async (username, password) => {
    const res = await fetch(`${API}/login?username=${username}&password=${password}`, {
        method: "POST"
    });
    return res.json();
};


//track
export const getComplaintById = async (id) => {
  const res = await fetch(`${API}/complaint/${id}`);
  return res.json();
};
