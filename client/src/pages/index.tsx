import Navbar from "@/components/Navbar";
import AuthContext from "@/contextAPI/AuthContext";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {

  // const router = useRouter()
  // const { isAuth, token, setAuth, setToken } = useContext(AuthContext);

  // useEffect(() => {
  //   if (!isAuth)
  //     router.push('/auth/login')
  // }, [isAuth])

  return (
    <Box>
      <Navbar />
      HOME
    </Box>
  )
}
