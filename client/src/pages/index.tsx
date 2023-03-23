import AuthContext from "@/contextAPI/AuthContext";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";

export default function Home() {

  const { isAuth, token, setAuth, setToken } = useContext(AuthContext);
 

  return (
    <Box>
      HOME
    </Box>
  )
}
