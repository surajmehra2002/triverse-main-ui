import { logoutUser } from "@/api/services/authService";
export const logout = async () => {
    alert("Logging out...");
    // await logoutUser();
    
    window.location.href = "/"; // Or use router.push("/") if needed
  };