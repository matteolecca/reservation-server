export const corsOptions = {
    origin: [
        "http://localhost:8100",
        "http://localhost:3000",
        "http://192.168.1.180:8100",
        "http://192.168.36.166:8100",
        "capacitor://localhost",
        "http://172.20.10.4:8100",
        "http://192.168.1.10:8100",
        "http://localhost",
        "http://192.168.1.180:8101",
    ],
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    sameSite: "none"
};