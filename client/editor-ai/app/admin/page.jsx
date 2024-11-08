'use client'
import React, { use } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Page() {
    // const { user } = useAuth()
    // const router = useRouter()
    // const { isLoggedIn } = useAuth();
    // React.useEffect(() => {
    //     // if (user != null) router.push("/pages/homepage")
    //     // else if (user == null) {
    //     //     router.push("/pages/login"); // Redirect to login page if user is not authenticated
    //     //   }
    //     if(isLoggedIn == true) router.push("/pages/homepage")
    //     else if (isLoggedIn == false) {
    //         router.push("/pages/login");
    //     }
    // }, [isLoggedIn])

    return (<h1>Only logged in users can view this page</h1>);
}

export default Page;